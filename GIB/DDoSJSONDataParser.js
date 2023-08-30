import _ from 'lodash';
import fs from 'fs';

export default class DDoSJSONDataParser {

    constructor(data) {
        this.data = data;
    }

    parseJSONData = async (filename) => {
        let retArr = []
        _.map(this.data.items, (item) => {
            const ipValue = _.get(item, `cnc.ipv4.ip`);
            if (ipValue != undefined) retArr.push(ipValue)
        })
        retArr = _.uniq(retArr)
        fs.writeFileSync(filename+'.txt', retArr.join('\n'))
    }

    concatFile = async (filename, stringdata) => {
        try {
            const openedFile = fs.readFileSync(`./${filename}-update.txt`, 'utf8');
            const concatenatedText = stringdata + '\n' + openedFile;
            fs.writeFileSync(`./${filename}.txt`, concatenatedText, 'utf8');
            console.log(`Concatenated text saved to ${filename}.txt successfully!`);
        } catch (err) {
            console.error(`Error processing files:`, err);
        }
    }
}