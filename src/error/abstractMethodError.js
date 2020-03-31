module.exports = class AbstractMethodError extends Error {
    constructor() {
        super("Method is abstract");
    }
}