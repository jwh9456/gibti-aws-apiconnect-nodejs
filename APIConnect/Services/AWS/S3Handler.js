import fs from "fs";
import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import awsConfig from "./awsConfig.json" assert { type: "json" };

export class S3Handler {
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
      Bucket: "smilelog-test-bucket",
      Key: fileName,
      Body: fileContent,
    });

    try {
      const data = await this.s3.send(command);
      console.log("File uploaded successfully:", data.Location);
    } catch (err) {
      console.error("Error uploading file:", err);
    }
  }
}

export default S3Handler;
