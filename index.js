const child_process = require("child_process");
const restify = require('restify');

function gutti(req, res, next) {
  const proc = child_process.spawn("python", ["stepper.py"]);

  proc.once("exit", () => {
    console.log("Stepper script exited");

    res.contentType = "text/plain";
    res.send(200, 'ok');
    next();
  });

  setTimeout(() => {
    proc.kill("SIGTERM");
  }, 10000);
}

var server = restify.createServer({name:'guttiMachine'});
server.get('/gutti', gutti);
server.get('/:file', restify.serveStatic({directory: './public', default: 'index.html'}));

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
