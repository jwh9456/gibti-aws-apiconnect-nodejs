import fetch from "node-fetch";
import tiConfig from "./tiConfig.json" assert { type: "json" };

class RESTAPIHandler {
  constructor() {
    this.auth =
      "Basic " +
      Buffer.from(tiConfig.login + ":" + tiConfig.key).toString("base64");
    this.headers = {
      'Accept': "application/json",
      'Authorization': this.auth,
    };
    this.apiURL = "https://tap.group-ib.com/api/v2/";
  }

  async fetchData(endpoint) {
    try {
      const res = await fetch(this.apiURL + endpoint, {
        method: "GET",
        headers: this.headers,
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      
      return await res.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  async getDDoSUpdate() {
    return this.fetchData("attacks/ddos/updated");
  }

  async getScannerUpdate() {
    return this.fetchData("suspicious_ip/scanner/updated");
  }
}

export default RESTAPIHandler;