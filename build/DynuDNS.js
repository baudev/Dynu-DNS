"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseEnum_1 = require("./ResponseEnum");
const isMd5 = require('is-md5');
const md5 = require('md5');
const fetch = require('node-fetch');
class DynuDNS {
    constructor(username, password) {
        this._username = username;
        // hash the password if needed
        this._password = isMd5(password) ? password : md5(password);
    }
    /**
     * Updates IP of the specified domain
     * @param domain
     * @param ipv4 10.0.0.0 will be replaced by the request sender IP.
     */
    updateIPOfDomain(domain, ipv4) {
        return new Promise(((resolve, reject) => {
            fetch("https://api.dynu.com/nic/update?hostname=" + domain + "&username=" + this.username + "&password=" + this.password + "&myip=" + ipv4)
                .then((res) => res.text())
                .then((text) => {
                let enumResponse = this.handleResponse(text);
                switch (enumResponse) {
                    case ResponseEnum_1.ResponseEnum.GOOD:
                    case ResponseEnum_1.ResponseEnum.NOCHG:
                        return resolve(enumResponse);
                    default:
                        return reject(enumResponse);
                }
            });
        }));
    }
    /**
     * Returns the corresponding ResponseEnum from http content response
     * @param text
     */
    handleResponse(text) {
        if (new RegExp(/good/).test(text)) {
            return ResponseEnum_1.ResponseEnum.GOOD;
        }
        if (new RegExp(/nochg/).test(text)) {
            return ResponseEnum_1.ResponseEnum.NOCHG;
        }
        switch (text) {
            case "unknown":
                return ResponseEnum_1.ResponseEnum.UNKNOWN;
            case "badauth":
                return ResponseEnum_1.ResponseEnum.BADAUTH;
            case "notfqdn":
                return ResponseEnum_1.ResponseEnum.NOTFQDN;
            case "numhost":
                return ResponseEnum_1.ResponseEnum.NUMHOST;
            case "abuse":
                return ResponseEnum_1.ResponseEnum.ABUSE;
            case "nohost":
                return ResponseEnum_1.ResponseEnum.NOHOST;
            case "911":
                return ResponseEnum_1.ResponseEnum._911;
            case "dnserr":
                return ResponseEnum_1.ResponseEnum.DNSERR;
            case "!donator":
                return ResponseEnum_1.ResponseEnum.DONATOR;
            default:
                return ResponseEnum_1.ResponseEnum.SERVERERROR;
        }
    }
    get password() {
        return this._password;
    }
    set password(value) {
        this._password = value;
    }
    get username() {
        return this._username;
    }
    set username(value) {
        this._username = value;
    }
}
exports.DynuDNS = DynuDNS;
