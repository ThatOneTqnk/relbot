const CommandBase = require('../commandBase');
const cloner = require('../../skript/fetcher/cloner');
const filter = require('../../skript/filter/filter');
const fs = require('fs');
const cache = require('../../skript/cache/cache');

module.exports = class FlushSkriptCommand extends CommandBase {
    constructor() {
        super(["flush", "flushed"]);
        this.lastUsed = Date.now() - 15000;
    }

    async execute(usedalias, cbfn) {
        if (Date.now() - this.lastUsed < 15000) {
            cbfn(null, "Please wait 15 seconds before flushing again!");
            return;
        }
        this.lastUsed = Date.now();
        let response;
        cbfn(null, `Downloading skripts from ${process.env.GREPO} ...`);
        try {
            response = await cloner();
        } catch (e) {
            console.error(e.toString());
        }
        cbfn(null, 'Downloaded! Looking for skripts');
        const filterResult = await filter();
        cache.updateCache(filterResult);
        cbfn(null, 'Updated Skript cache, use `.ul` to upload with new cache');
    }
}