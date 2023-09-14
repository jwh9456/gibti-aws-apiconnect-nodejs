import STIXDataParser from "./Services/GIB/STIXDataParser.js";
import STIXAPIHandler from "./Services/GIB/STIXAPIHandler.js";
import RESTAPIHandler from "./Services/GIB/RESTAPIHandler.js";
import JSONDataParser from "./Services/GIB/JSONDataParser.js";
import S3Handler from "./Services/AWS/S3Handler.js";
import { GuardDutyHandler } from "./Services/AWS/GuardDutyHandler.js";

async function main() {
  const filename1 = "LotteGuardDutyIOC";
  const filename2 = "LotteGuardDutyMalwareC2";
  const filename3 = "LotteGuardDutyDDoS";
  const filename4 = "LotteGuardDutyScanner";

  const jsonDataParser = new JSONDataParser();
  const stixAPIHandler = new STIXAPIHandler();
  const stixDataParser = new STIXDataParser();
  const restAPIHandler = new RESTAPIHandler();
  const s3Handler = new S3Handler();
  const guardDutyHandler = new GuardDutyHandler();

  // get IOC update
  await stixAPIHandler.generateIOCCommon(filename1);
  await stixDataParser.convertSTIXFile(filename1, `./tmp/${filename1}.stix`);

  //get malware update
  await stixAPIHandler.generateMalwareC2(filename2);
  await stixDataParser.convertSTIXFile(filename2, `./tmp/${filename2}.stix`);

  //get ddos update
  const DDosData = await restAPIHandler.getDDoSUpdate();
  const ddosJson = jsonDataParser.parseJSONData(DDosData, filename3, `cnc.ipv4.ip`);

  //get scanner update
  const ScannerData = await restAPIHandler.getScannerUpdate();
  const scannerJson = jsonDataParser.parseJSONData(ScannerData, filename4, `ipv4.ip`);

  // concat files
  await stixDataParser.concatFile(filename1, await s3Handler.getObject(filename1));
  await stixDataParser.concatFile(filename2, await s3Handler.getObject(filename2));
  await jsonDataParser.concatFile(filename3, await s3Handler.getObject(filename3));
  await jsonDataParser.concatFile(filename4, await s3Handler.getObject(filename4));

  await s3Handler.uploadFileToS3(`${filename1}.stix`, `./tmp/${filename1}.stix`);
  await s3Handler.uploadFileToS3(`${filename2}.stix`, `./tmp/${filename2}.stix`);
  await s3Handler.uploadFileToS3(`${filename1}.txt`, `./tmp/${filename1}.txt`);
  await s3Handler.uploadFileToS3(`${filename2}.txt`, `./tmp/${filename2}.txt`);

  await s3Handler.uploadFileToS3(`${filename3}.txt`, `./tmp/${filename3}.txt`);
  await s3Handler.uploadFileToS3(`${filename4}.txt`, `./tmp/${filename4}.txt`);

  try {
    await guardDutyHandler.createThreatIntelSet(filename1);
    await guardDutyHandler.createThreatIntelSet(filename2);
    await guardDutyHandler.createThreatIntelSet(filename3);
    await guardDutyHandler.createThreatIntelSet(filename4);
  } catch (error) {
    await guardDutyHandler.updateThreatIntelSets();
  }

  // Other operations like listObjectsinBucket and makeemptyfolder can be added here.
}

main();

// await s3Handler.listObjectsinBucket();
// await s3Handler.makeemptyfolder();