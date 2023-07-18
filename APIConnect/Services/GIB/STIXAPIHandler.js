import tiConfig from "./tiConfig.json" assert { type: "json" };
import { execSync } from "child_process";

class STIXAPIHandler {
  constructor() {
    this.curlExec = `curl -X GET -u '${tiConfig.login}:${tiConfig.key}' -H 'Accept: application/taxii+json; version=2.1' `;
    this.apiURL = "https://tap.group-ib.com/api/taxii/v2.1/collections/";
  }

  generateIOCCommon = async (filename) => {
    await execSync(
      this.curlExec +
        this.apiURL +
        "ioc__common__ip/objects/" +
        ` -o ${filename}.stix`,
      (error, stdout, stderr) => {
        if (error) console.log("Err: ", error);
      }
    );
  };

  generateMalwareC2 = async (filename) => {
    await execSync(
      this.curlExec +
        this.apiURL +
        "malware__cnc/objects/" +
        ` -o ${filename}.stix`,
      (error, stdout, stderr) => {
        if (error) console.log("Err: ", error);
      }
    );
  };
}

export default STIXAPIHandler;
