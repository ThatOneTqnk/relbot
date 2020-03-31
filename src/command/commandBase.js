const AbstractMethodError = require('../error/abstractMethodError');

module.exports = class CommandBase {
    constructor(cmdaliases) {
        this.aliases = cmdaliases;
    }

    hasAlias(inalias) {
        for (let alias of this.aliases) {
            if (alias === inalias) return true;
        }
        return false;
    }

    async execute(usingalias, cbfn) {
        throw new AbstractMethodError();
    }
}