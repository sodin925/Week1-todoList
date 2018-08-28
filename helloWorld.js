const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((request, response) => {
  resquest.statusCode = 200;
  resquest.setHeader('Content-Type', 'text/plain');
  response.end('Hello World');
});
server.listen(port, hostname, () => {
  console.log(`server running at http://${hostname}:${port}/`);
});