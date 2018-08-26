let http = require('http');
let fs = require('fs');
let server = http.createServer(function(request, response) {
  response.writeHead(200, {
    'Content-Type':'text/html'
  });
  fs.readFile('./index.html', function(err, html) {
    if(!err) {
      response.write(html);
      response.end();
    }
  })
})
server.listen(3000, '127.0.0.1');