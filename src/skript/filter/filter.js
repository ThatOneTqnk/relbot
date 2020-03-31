const fs = require('fs').promises;
module.exports = function() {
    return new Promise(async (resolve, reject) => {
        const directory = require('../fetcher/cloner').DIRECTORY + '/';
        const filesObj = [];
        const files = await fs.readdir(directory);
        for (let fileName of files) {
            if (/\.sk$/.test(fileName)) {
                const content = await fs.readFile(directory + fileName, 'utf8');
                filesObj.push({
                    filename: fileName,
                    content: content
                });
            }
        }
        resolve(filesObj);
    });
}