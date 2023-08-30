import fetch from "node-fetch";
import tiConfig from "./tiConfig.json" assert { type: "json" };

import fs from 'fs';

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

  getDDoSUpdate = async () => {
    try {
      const res = await fetch(this.apiURL + "attacks/ddos", {
        method: "GET",
        headers: this.headers,
      });

      const body = await res.json();
      return body;
      
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

export default RESTAPIHandler;

// getMalwareCNCIPfromID = async (ID) => {
  // try {
    // const res = await fetch(this.apiURL + "malware/cnc/" + ID, {
      // method: "GET",
      // headers: this.headers,
    // });
    // const body = await res.json();
    // return body;
  // } catch (error) {
    // console.error("Error:", error);
  // }
// };
// 
// getMalwareCNCUpdate = async () => {
  // try {
    // const res = await fetch(this.apiURL + "malware/cnc/updated", {
      // method: "GET",
      // headers: this.headers,
    // });
// 
    // const body = await res.json();
    // return body;
  // } catch (error) {
    // console.error("Error:", error);
  // }
// };