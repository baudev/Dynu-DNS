import { ResponseEnum } from "./ResponseEnum";
export declare class DynuDNS {
    private _username;
    private _password;
    constructor(username: string, password: string);
    /**
     * Updates IP of the specified domain
     * @param domain
     * @param ipv4 10.0.0.0 will be replaced by the request sender IP.
     */
    updateIPOfDomain(domain: string, ipv4: string): Promise<ResponseEnum>;
    /**
     * Returns the corresponding ResponseEnum from http content response
     * @param text
     */
    private handleResponse;
    get password(): string;
    set password(value: string);
    get username(): string;
    set username(value: string);
}
