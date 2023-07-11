// import APIHandler from "./Services/GIB/APIHandler.js";
// import {DataParser} from "./Services/GIB/DataParser.js";
// import TXTBuilder from "./Services/GIB/TXTBuilder.js";

import STIXAPIHandler from "./Services/GIB/STIXAPIHandler.js";
import S3Handler from "./Services/AWS/S3Handler.js";
import GuardDutyHandler from "./Services/AWS/GuardDutyHanlder.js";

// const filename1 = "TEST3031"
// const filename2 = "TEST30433"

// const stixAPIHandler = new STIXAPIHandler();
// await stixAPIHandler.generateIOCCommon(filename1)
// await stixAPIHandler.generateMalwareC2(filename2)

// const s3Handler = new S3Handler();
// await s3Handler.uploadFileToS3(filename1, `./${filename1}.stix`)
// await s3Handler.uploadFileToS3(filename2, `./${filename2}.stix`)

const guardDutyHandler = new GuardDutyHandler()
// await guardDutyHandler.createThreatIntelSet(filename1);
// await guardDutyHandler.createThreatIntelSet(filename2);
await guardDutyHandler.ListThreatIntelSets()