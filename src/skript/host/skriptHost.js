const AbstractMethodError = require('../../error/abstractMethodError');

class SkriptHost {
    getRESTBase() {
        throw new AbstractMethodError();
    }

    async checkAlive() {
        throw new AbstractMethodError();
    }

    async updateSkript(name, src) {
        throw new AbstractMethodError();
    }
}

module.exports = SkriptHost;