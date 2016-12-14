const restify = require('restify');

function gutti(req, res, next) {
  res.send(200, 'ok');
  next();
}

var server = restify.createServer({name:'guttiMachine'});
server.get('/gutti', gutti);
server.get('/', restify.serveStatic({directory: './public', default: 'index.html'}));

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
