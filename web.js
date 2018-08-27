var mime = require("mime"); //自動判定content-type
var url = require("url");
var fs = require("fs");
var http = require("http");

var server = http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    if (pathname.endsWith("/")) {                  //預設頁
        pathname += "index.html";
    }
    var relativePathname = decodeURIComponent((process.argv[2] || ".") + pathname);  //開啟參數
    fs.stat(relativePathname, function (err, stats) {
        if (!err && stats.isDirectory()) {
            res.writeHead(302, {  //status code 302
                "Location" : pathname + "/" + (url.parse(req.url).search || "")
            });
            res.end();
            return;
        }
        if (!err && stats.isFile()) {
            fs.readFile(relativePathname, function (err, html) {
                if (!err) {
                    res.writeHead(200, {
                        "Content-type": mime.getType(pathname)
                    });
                    res.write(html);
                    res.end();
                }
            });
        } else {
            res.writeHead(404);
            res.write("Not Found");
            res.end();
        }
    });
}).listen(0);
server.on('listening', function() {
  let port = server.address().port;
  console.log(port);
});