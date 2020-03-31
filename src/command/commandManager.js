module.exports = class CommandManager {
    constructor() {
        this.commands = [];
    }

    registerCommand(cmd) {
        this.commands.push(cmd);
    }

    readCommand(command, cbfn) {
        const foundCmd = this.commands.find((elem) => {
            return elem.hasAlias(command);
        });
        if (!foundCmd) {
            cbfn(CODES.COMMAND_NOT_FOUND, null);
        } else {
            foundCmd.execute(command, cbfn);
        }
    }
}

const CODES = Object.freeze({
    OKAY: 1,
    COMMAND_NOT_FOUND: 2
});

module.exports.CODES = CODES;