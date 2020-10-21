# flex-http-echo-server

Based on @watson [http-echo-server](https://github.com/watson/http-echo-server)

This will create either a HTTP or HTTPS server. The ```npm run start``` script takes care of creating a self-signed certificate to make things easier.
It replies with the configured HTTP Code(or 200 as a default) and prints the body of the request as well as the URL and Method used.

## Installation

Execute ```npm install``` as usual.

## Example usage

Just curl the URL of the app:

```
# When using HTTP: GET
curl -k https://localhost:56537/trying/out/the/url

# When using HTTPS: GET request that accepts the self-signed certificate
curl -k https://localhost:56537/trying/out/the/url

# When using HTTP: POST request that accepts the self-signed certificate
curl -k https://localhost:56537/trying/out/the/url -d "{ \"data\": \"tests\" }"

# When using HTTP: POST request
curl http://localhost:56537/trying/out/the/url -d "{ \"data\": \"tests\" }"
```

TODO:
- Add documentation on how to start in HTTPS mode;
- Add documentation on how to set up the port;
- Add documentation on how to set up the HTTP Code;

## License

[MIT](LICENSE)
