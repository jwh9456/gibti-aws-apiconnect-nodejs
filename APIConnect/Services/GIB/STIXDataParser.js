import _ from "lodash";
import fs from "fs";

class STIXDataParser {
  constructor() {}

  convertSTIXFile = async (filename, filepath) => {
    try {
      const FS = fs.readFileSync(filepath);
      const data = JSON.parse(FS);
      const IPs = _.map(data.objects, "pattern", "value").filter((value) => typeof value !== undefined);

      const formattedIPAddresses = IPs.filter((item) => typeof item === 'string' && item.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/))
      .map((item) => item.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/)[0])
      .filter((value, index, self) => self.indexOf(value) === index)
      .join('\n');

      fs.writeFileSync("./tmp/"+filename + "-update.txt", formattedIPAddresses, "utf-8");
      console.log("Conversion completed. Check output.txt file.");
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };

  concatFile = async (filename,stringdata) => {
    try {
      const openedFile = fs.readFileSync(`./tmp/${filename}-update.txt`, 'utf8');
      const concatenatedText = stringdata +'\n' +openedFile;
      fs.writeFileSync(`./tmp/${filename}.txt`, concatenatedText, 'utf8');
      console.log(`Concatenated text saved to ${filename}.txt successfully!`);
    } catch (err) {
      console.error(`Error processing files:`, err);
    }
  };
}

export default STIXDataParser;