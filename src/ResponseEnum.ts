export enum ResponseEnum {
    /**
     * This response code is returned if an invalid 'request' is made to the API server. This 'response code' could be generated as a result of badly formatted parameters as well so parameters must be checked for validity by the client before they are passed along with the 'request'.
     */
    UNKNOWN,
    /**
     * This response code means that the action has been processed successfully. Further details of the action may be included along with this 'response code'.
     */
    GOOD,
    /**
     * This response code is returned in case of a failed authentication for the 'request'. Please note that sending across an invalid parameter such as an unknown domain name can also result in this 'response code'. The client must advise the user to check all parameters including authentication parameters to resolve this problem.
     */
    BADAUTH,
    /**
     * This response code is returned in cases where an error was encountered on the server side. The client may send across the request again to have the 'request' processed successfully.
     */
    SERVERERROR,
    /**
     * This response code is returned in cases where IP address was found to be unchanged on the server side.
     */
    NOCHG,
    /**
     * This response code is returned in cases where the hostname is not a valid fully qualified hostname.
     */
    NOTFQDN,
    /**
     * This response code is returned in cases where too many hostnames(more than 20) are specified for the update process.
     */
    NUMHOST,
    /**
     * This response code is returned in cases where update process has failed due to abusive behaviour.
     */
    ABUSE,
    /**
     * This response code is returned in cases where hostname/username is not found in the system.
     */
    NOHOST,
    /**
     * This response code is returned in cases where the update is temporarily halted due to scheduled maintenance. Client must respond by suspending update process for 10 minutes upon receiving this response code.
     */
    _911,
    /**
     * This response code is returned in cases where there was an error on the server side. The client must respond by retrying the update process.
     */
    DNSERR,
    /**
     * This response code is returned to indicate that this functionality is only available to members.
     */
    DONATOR
}