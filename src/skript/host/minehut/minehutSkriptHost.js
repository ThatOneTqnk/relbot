const SkriptHost = require('../skriptHost');
const fetch = require('node-fetch');
const BASE = "https://api.minehut.com"
const SKRIPT_BASE = "/plugins/Skript/scripts/";

class MinehutSkriptHost extends SkriptHost {
    getRESTBase() {
        return BASE;
    }

    async checkAlive() {
        let aliveResponse;
        try {
            aliveResponse = await this.performRequest(`/server/${process.env.MH_SERVER_ID}/status`, null, 'GET');
        } catch (e) {
            return false;
        }
        return aliveResponse.status.status === 'ONLINE';
    }

    async updateSkript(name, src) {
        let updateResponse;
        try {
            updateResponse = await this.performRequest(`/file/${process.env.MH_SERVER_ID}/edit${SKRIPT_BASE}${name}`, {
                "content": src
            }, 'POST');
        } catch (e) {
            return false;
        }
        return true;
    }

    performRequest(endpoint, body, method) {
        return new Promise(async (resolve, reject) => {
            let resp;
            try {
                resp = await fetch(BASE + endpoint, {
                    "headers": {
                        "accept":"application/json, text/plain, */*",
                        "accept-language":"en-US,en;q=0.9",
                        "authorization": process.env.MH_AUTHORIZATION,
                        "content-type":"application/json",
                        "sec-fetch-dest":"empty",
                        "sec-fetch-mode":"cors",
                        "sec-fetch-site":"same-site",
                        "x-session-id": process.env.MH_X_SESSION_ID
                    },
                    "referrer":"https://minehut.com/",
                    "referrerPolicy":"no-referrer-when-downgrade",
                    "body": body == null ? body : JSON.stringify(body),
                    "method": method,
                    "mode":"cors"
                });
            } catch (e) {
                reject(e);
            }
            const responseJSON = await resp.json();
            resolve(responseJSON);
        })
    } 
}

module.exports = MinehutSkriptHost;