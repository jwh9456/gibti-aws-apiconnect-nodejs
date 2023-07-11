import fs from "fs";

export class TXTBuilder {
  constructor() {
    this.outputFile = 'output.txt';
    this.jsonData = {}; // Assign your JSON data here
    this.formattedData = this.formatElements(this.jsonData);
    this.writeFile();
  }

  formatElements(jsonData) {
    // Your code to format the JSON data
    return formattedData;
  }

  writeFile() {
    fs.writeFile(this.outputFile, this.formattedData, 'utf8', (err) => {
      if (err) {
        console.error('An error occurred while writing the file:', err);
        return;
      }
    });
  }
}

export default TXTBuilder;