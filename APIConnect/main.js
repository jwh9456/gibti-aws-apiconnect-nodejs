import STIXDataParser from "./Services/GIB/STIXDataParser.js";
import STIXAPIHandler from "./Services/GIB/STIXAPIHandler.js";
import S3Handler from "./Services/AWS/S3Handler.js";
import GuardDutyHandler from "./Services/AWS/GuardDutyHanlder.js";

const filename1 = "LotteGuardDutyIOC";
const filename2 = "LotteGuardDutyMalwareC2";

const stixAPIHandler = new STIXAPIHandler();
await stixAPIHandler.generateIOCCommon(filename1);
await stixAPIHandler.generateMalwareC2(filename2);
// 
const stixDataParser = new STIXDataParser();
await stixDataParser.convertSTIXFile(filename1,"/root/APIConnect/"+filename1+'.stix');
await stixDataParser.convertSTIXFile(filename2,"/root/APIConnect/"+filename2+'.stix');

const s3Handler = new S3Handler();
let string1 = await s3Handler.getObject(filename1);
let string2 = await s3Handler.getObject(filename2);

await stixDataParser.concatFile(filename1,string1);
await stixDataParser.concatFile(filename2,string2);

await s3Handler.uploadFileToS3(`${filename1}.stix`, `./${filename1}.stix`);
await s3Handler.uploadFileToS3(`${filename2}.stix`, `./${filename2}.stix`);

await s3Handler.uploadFileToS3(`${filename1}.txt`, `./${filename1}.txt`);
await s3Handler.uploadFileToS3(`${filename2}.txt`, `./${filename2}.txt`);

const guardDutyHandler = new GuardDutyHandler();
await guardDutyHandler.createThreatIntelSet(filename1);
await guardDutyHandler.createThreatIntelSet(filename2);
await guardDutyHandler.updateThreatIntelSets();

// await s3Handler.listObjectsinBucket();
// await s3Handler.makeemptyfolder();