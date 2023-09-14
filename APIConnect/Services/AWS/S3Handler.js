import { 
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3
} from "@aws-sdk/client-s3";
import fs from "fs";
import awsConfig from "./awsConfig.json" assert { type: "json" };

class S3Handler {
  constructor() {
    this.s3 = new S3({
      region: awsConfig.region,
      credentials: {
        accessKeyId: awsConfig.accessKeyId,
        secretAccessKey: awsConfig.secretAccessKey,
      },
    });
  }

  async uploadFileToS3(fileName, filePath) {
    const fileContent = fs.readFileSync(filePath);
    const command = new PutObjectCommand({
      Bucket: awsConfig.s3bucketname,
      Key: "TI-STIX/" + fileName,
      Body: fileContent,
    });

    try {
      const data = await this.s3.send(command);
      console.log("File uploaded successfully");
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  }

  async makeemptyfolder() {
    try {
      const data = await this.s3.putObject({
        Key: "TI-STIX/",
        Bucket: awsConfig.s3bucketname,
      });
      console.log("Folder made");
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  }

  async listObjectsinBucket() {
    const command = new ListObjectsV2Command({
      Bucket: awsConfig.s3bucketname,
      Prefix: "TI-STIX/",
    });
    try {
      let isTruncated = true;

      console.log("TI-STIX/ contains:\n");
      let contents = "";

      while (isTruncated) {
        const { Contents, IsTruncated, NextContinuationToken } =
          await this.s3.send(command);
        const contentsList = Contents.map((c) => ` • ${c.Key}`).join("\n");
        contents += contentsList + "\n";
        isTruncated = IsTruncated;
        command.input.ContinuationToken = NextContinuationToken;
      }
      console.log(contents);
    } catch (err) {
      console.error(err);
    }
  }

  async getObject(filename){
    return new Promise(async (resolve, reject) =>{
      const command = new GetObjectCommand({
        Bucket:awsConfig.s3bucketname,
        Key : "TI-STIX/"+filename+".txt"
      });
      try {
        const response = await this.s3.send(command);
        let responseDataChunks = []
        response.Body.once('error',err => reject(err))
        response.Body.on('data', chunk => responseDataChunks.push(chunk))
        response.Body.once("end", () => resolve(responseDataChunks.join('')))
      } catch (error) {
        console.log(error)    
      }
    })
  }
}

export default S3Handler;