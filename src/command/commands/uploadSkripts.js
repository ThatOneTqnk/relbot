const CommandBase = require('../commandBase');
const cache = require('../../skript/cache/cache');
const MHSkriptHost = require('../../skript/host/minehut/minehutSkriptHost');

const mh = new MHSkriptHost();

module.exports = class UploadSkriptCommand extends CommandBase {
    constructor() {
        super(["ul", "upload"]);
        this.lastUsed = Date.now() - 20000;
    }

    async execute(usedalias, cbfn) {
        if (Date.now() - this.lastUsed < 20000) {
            cbfn(null, "Please wait 20 seconds before uploading again!");
            return;
        }
        this.lastUsed = Date.now();
        if (!cache.exists()) {
            cbfn(null, "Cache does not exists, exiting");
            return;
        }
        cbfn(null, "Checking if server is up");
        const isAlive = await mh.checkAlive();
        if (!isAlive) {
            cbfn(null, "Server was not up, exiting");
            return;
        }
        cbfn(null, "Server was up, uploading skripts");

        const summaries = [];
        for (let sourceFile of cache.getCache()) {
            const success = await mh.updateSkript(sourceFile.filename, sourceFile.content);
            if (success) {
                summaries.push(`Success! Updated ${sourceFile.filename}`);
            } else {
                summaries.push(`:x: Could not update ${sourceFile.filename}`);
            }
        }
        cbfn(null, summaries.join('\n'));
    }

}