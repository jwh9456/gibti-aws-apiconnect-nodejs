import fetch from "node-fetch";
import tiConfig from "./tiConfig.json" assert { type: "json" };

class APIHandler {
  constructor() {
    this.auth =
      "Basic " +
      Buffer.from(tiConfig.login + ":" + tiConfig.key).toString("base64");
    this.headers = {
      Accept: "application/json",
      Authorization: this.auth,
    };
    this.apiURL = "https://tap.group-ib.com/api/v2/";
  }

  getMalwareCNCUpdate = async () => {
    try {
      const res = await fetch(this.apiURL + "malware/cnc/updated", {
        method: "GET",
        headers: this.headers,
      });

      const body = await res.json();
      return body;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  getMalwareCNCIPfromID = async(ID) => {
    try {
      const res = await fetch(this.apiURL + "malware/cnc/"+ID, {
        method: "GET",
        headers: this.headers,
      });

      const body = await res.json();
      return body;
    } catch (error) {
      console.error("Error:", error);
    }
  };
}

export default APIHandler;

// fetch('https://tap.group-ib.com/api/v2/apt/threat',
// fetch('https://tap.group-ib.com/api/v2/ioc/common/updated',
// fetch('https://tap.group-ib.com/api/v2/malware/cnc/updated',
// fetch('https://tap.group-ib.com/api/v2/ioc/common/6caf5aff6bb9e12c2e42ccdb93e0037b253d40fb',