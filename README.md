# Dynu-DNS

Updates IP of your dynamic DNS (dynu.com)

## Installation

``` 
npm i dynu-dns
```

## Usage

Example updating the IPV4 of the domain `domain.com`.

``` 
typscript
let dns = new DynuDNS("username", "password");
dns.updateIPOfDomain("domain.com", "145.126.1.0")
    .then((res: ResponseEnum) => {
        console.log("success!")
    })
    .catch((err: ResponseEnum) => {
        console.log("error...")
    });
```

## API

### Class DynuDNS

**constructor(username, password)**

+ username - (_string_) Username of the dynu account.
+ password - (_string_) Password of the dynu account. For security reason, you can pass the md5 of your password.

**updateIPOfDomain(domain, ipv4): Promise<ResponseEnum>**

+ domain - (_string_) Domain you want to update (without http://).
+ ipv4 - (_string_) IPV4 you want to set. If `10.0.0.0`, it will be replaced by the origin request IPV4.

### ResponseEnum

See [`ResponseEnum.ts`](src/ResponseEnum.ts) for more details. 
