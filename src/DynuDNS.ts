import {ResponseEnum} from "./ResponseEnum";

const isMd5 = require('is-md5');
const md5 = require('md5');
const fetch = require('node-fetch');

export class DynuDNS {

    private _username: string;
    private _password: string;

    constructor(username: string, password: string) {
        this._username = username;
        // hash the password if needed
        this._password = isMd5(password) ? password : md5(password);
    }

    /**
     * Updates IP of the specified domain
     * @param domain
     * @param ipv4 10.0.0.0 will be replaced by the request sender IP.
     */
    public updateIPOfDomain(domain: string, ipv4: string): Promise<ResponseEnum> {
        return new Promise(((resolve, reject) => {
            fetch("https://api.dynu.com/nic/update?hostname=" + domain + "&username=" + this.username + "&password=" + this.password + "&myip=" + ipv4)
                .then((res: Response) => res.text())
                .then((text: string) => {
                    let enumResponse = this.handleResponse(text);
                    switch (enumResponse) {
                        case ResponseEnum.GOOD:
                        case ResponseEnum.NOCHG:
                            return resolve(enumResponse);
                        default:
                            return reject(enumResponse);
                    }
                })
        }));
    }

    /**
     * Returns the corresponding ResponseEnum from http content response
     * @param text
     */
    private handleResponse(text: string): ResponseEnum{
        if(new RegExp(/good/).test(text)){
            return ResponseEnum.GOOD;
        }
        if(new RegExp(/nochg/).test(text)){
            return ResponseEnum.NOCHG;
        }
        switch (text) {
            case "unknown":
                return ResponseEnum.UNKNOWN;
            case "badauth":
                return ResponseEnum.BADAUTH;
            case "notfqdn":
                return ResponseEnum.NOTFQDN;
            case "numhost":
                return ResponseEnum.NUMHOST;
            case "abuse":
                return ResponseEnum.ABUSE;
            case "nohost":
                return ResponseEnum.NOHOST;
            case "911":
                return ResponseEnum._911;
            case "dnserr":
                return ResponseEnum.DNSERR;
            case "!donator":
                return ResponseEnum.DONATOR;
            default:
                return ResponseEnum.SERVERERROR;
        }
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }
    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }
}