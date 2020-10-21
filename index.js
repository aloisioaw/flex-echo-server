const http = require('http');
const https = require('https');
const fs = require('fs');

const getPort = require('get-port')

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

var port = process.argv[2] || process.env.PORT
var httpCode = process.argv[3] || process.env.HTTP_CODE || 200;
var secure = process.argv[4] || process.env.SECURE || false
httpCode = parseInt(httpCode)
console.log('Will answer with HTTP Code ' + httpCode)
console.log('Will create a ' + (secure ? 'HTTPS' : 'HTTP') + ' server')

if (!port) {
  getPort({ port: 3000 }).then(function (port) {
    console.log(`Will listen at port ${port}`)
    setupServer(port, secure, httpCode)
  })
} else {
  console.log(`Will listen at port ${port}`)
  setupServer(port, secure, httpCode)
}

function setupServer(port, secure, httpCode) {
  if (!secure) {
    http.createServer(options, function (req, res) {
      res.writeHead(httpCode);
      res.end(req.body);
    }).listen(port);
  } else { 
    https.createServer(options, function (req, res) {
      console.log(`Method: ${req.method}`)
      console.log(`Url: ${req.url}`)
      req.on('data', (chunk) => {
        if (chunk) {
          console.log(JSON.parse(chunk))
        } else {
          console.log("Empty body")
        }
      });
      res.writeHead(httpCode);

      res.end();
    }).listen(port);
  }
}