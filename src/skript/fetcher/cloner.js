const spawn = require('await-spawn')
const DIRECTORY = "skripts";

module.exports = function() {
    return new Promise(async (resolve, reject) => {
        try {
            await spawn('rm', ['-r', DIRECTORY]);
        } catch (e) {}

        try {
            let cprocess = await spawn('git', ["clone", process.env.GREPO, DIRECTORY]);
            resolve(cprocess.toString());
        } catch (e) {
            reject(e);
        }
    });
}

module.exports.DIRECTORY = DIRECTORY;