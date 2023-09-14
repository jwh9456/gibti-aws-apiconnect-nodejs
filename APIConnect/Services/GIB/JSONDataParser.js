import _ from 'lodash';
import fs from 'fs';

class JSONDataParser {
    constructor(){}

    async parseJSONData(data, filename, lodashSkeleton){
        let retArr = []
        _.map(data.items, (item) => {
            const ipValue = _.get(item, lodashSkeleton);
            if (ipValue != undefined) retArr.push(ipValue)
        })
        retArr = _.uniq(retArr)
        fs.writeFileSync("./tmp/"+filename + '.txt', retArr.join('\n'))
    }

    async concatFile(filename, stringdata) {
        try {
            const openedFile = fs.readFileSync(`./tmp/${filename}-update.txt`, 'utf8');
            const concatenatedText = stringdata + '\n' + openedFile;
            fs.writeFileSync(`./tmp/${filename}.txt`, concatenatedText, 'utf8');
            console.log(`Concatenated text saved to ${filename}.txt successfully!`);
        } catch (err) {
            console.error(`Error processing files:`, err);
        }
    }
}

export default JSONDataParser;