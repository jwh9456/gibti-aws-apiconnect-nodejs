import { GuardDuty } from "@aws-sdk/client-guardduty";
import awsConfig from "./awsConfig.json" assert {type:'json'};

export class GuardDutyHandler {
  constructor() {
    this.guardDuty = new GuardDuty({
      region: awsConfig.region,
      credentials: {
        accessKeyId: awsConfig.accessKeyId,
        secretAccessKey: awsConfig.secretAccessKey
      }
    });
  }


  async createThreatIntelSet(filename) {
    const params = {
      Activate: true,
      Format: "STIX",
      Location: awsConfig.s3location + filename,
      DetectorId: awsConfig.GuardDutyDetectorId,
      Name: filename
    };

    this.guardDuty.createThreatIntelSet(params, async (err, data) => {
      console.log(params.Location);
      if (err) {
        console.log(err, err.stack);
        console.log(err._type);
      } else {
        console.log(data);
      }
    });
  }

  async updateThreatIntelSet() {
    params = {
      Activate: true,
      Format: "STIX",
      Location: awsConfig.s3location + filename,
      DetectorId: awsConfig.GuardDutyDetectorId,
      Name: "Filename"
    };

    this.guardDuty.updateThreatIntelSet(params, async (err, data) => {
      console.log(params.Location);
      if (err) {
        console.log(err, err.stack);
        console.log(err._type);
      } else {
        console.log(data);
      }
    });
  }

  async updateThreatIntelSet() {
    params = {
      Activate: true,
      Format: "STIX",
      Location: awsConfig.s3location + filename,
      DetectorId: awsConfig.GuardDutyDetectorId,
      Name: "Filename"
    };

    this.guardDuty.updateThreatIntelSet(params, async (err, data) => {
      console.log(params.Location);
      if (err) {
        console.log(err, err.stack);
        console.log(err._type);
      } else {
        console.log(data);
      }
    });
  }

  async ListThreatIntelSets() {
    this.guardDuty.ListThreatIntelSets(awsConfig.GuardDutyDetectorId, async (err, data) => {
      console.log(params.Location);
      if (err) {
        console.log(err, err.stack);
        console.log(err._type);
      } else {
        console.log(data);
      }
    });
  }


}

export default GuardDutyHandler;