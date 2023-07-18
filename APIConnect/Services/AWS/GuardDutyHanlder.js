import {
  GuardDutyClient,
  CreateThreatIntelSetCommand,
  ListThreatIntelSetsCommand,
  UpdateThreatIntelSetCommand,
  GetThreatIntelSetCommand,
} from "@aws-sdk/client-guardduty";
import awsConfig from "./awsConfig.json" assert { type: "json" };

export class GuardDutyHandler {
  constructor() {
    this.guardDuty = new GuardDutyClient({
      region: awsConfig.region,
      credentials: {
        accessKeyId: awsConfig.accessKeyId,
        secretAccessKey: awsConfig.secretAccessKey,
      },
    });
  }

  async createThreatIntelSet(filename) {
    const params = {
      Activate: true,
      Format: "TXT",
      Location: awsConfig.s3location + "TI-STIX/" + filename + ".txt",
      DetectorId: awsConfig.GuardDutyDetectorId,
      Name: filename,
    };
    const command = new CreateThreatIntelSetCommand(params);
    const response = await this.guardDuty.send(command);
    console.log(response);
  }

  async updateThreatIntelSet(id, filename) {
    const params = {
      DetectorId: awsConfig.GuardDutyDetectorId,
      Location: awsConfig.s3location + "TI-STIX/" + filename + ".txt",
      Activate: true,
      Name: filename,
      ThreatIntelSetId: id,
    };
    const command = new UpdateThreatIntelSetCommand(params);
    await this.guardDuty.send(command);
    console.log(filename + " updated")
  }

  async listThreatIntelSets() {
    const command = new ListThreatIntelSetsCommand({
      DetectorId: awsConfig.GuardDutyDetectorId,
    });
    const result = await this.guardDuty.send(command);
    return result;
  }

  async getThreatIntelSet(id) {
    const params = {
      DetectorId: awsConfig.GuardDutyDetectorId,
      ThreatIntelSetId: id,
    };
    const command = new GetThreatIntelSetCommand(params);
    const result = await this.guardDuty.send(command);
    return result;
  }

  async updateThreatIntelSets() {
    const gd = new GuardDutyHandler()
    let lists = (await gd.listThreatIntelSets()).ThreatIntelSetIds;
    for (let IDs of lists) {
      let SetName = (await gd.getThreatIntelSet(IDs)).Name;
      if (SetName == "LotteGuardDutyIOC") {
        await gd.updateThreatIntelSet(
          IDs,
          "LotteGuardDutyIOC"
        );
      } else if (SetName == "LotteGuardDutyMalwareC2") {
        await gd.updateThreatIntelSet(
          IDs,
          "LotteGuardDutyMalwareC2"
        );
      }
    }
  }
}

export default GuardDutyHandler;
