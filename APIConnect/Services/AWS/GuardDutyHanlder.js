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
    const gd = new GuardDutyHandler();
    const threatIntelSetNames = {
      LotteGuardDutyIOC: "LotteGuardDutyIOC",
      LotteGuardDutyMalwareC2: "LotteGuardDutyMalwareC2",
      LotteGuardDutyDDoS: "LotteGuardDutyDDoS",
      LotteGuardDutyScanner: "LotteGuardDutyScanner",
    };

    const lists = (await gd.listThreatIntelSets()).ThreatIntelSetIds;
    for (const id of lists) {
      const setName = (await gd.getThreatIntelSet(id)).Name;
      if (threatIntelSetNames[setName]) {
        await gd.updateThreatIntelSet(id, setName);
        console.log(setName + " updated")
      }
    }
  }
}