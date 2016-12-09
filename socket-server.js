// require Express and Socket.io
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (8080));

io.on('connection', function(client){
    
  client.join(client.handshake.query.playerId);
  	
	client.on('message',function(event){
		console.log('Received message from client!',event);
	});
  
	client.on('disconnect',function(){
		console.log('Server has disconnected');
	});
  
});

app.get('/', function(req, res){
    res.send('Hello World!');  
});

app.get('/issue/:playerId', function(req, res){
    var playerId = req.params.playerId;
    io.to(playerId).emit('issue', {playerId: playerId, result: `Winner ${playerId}`});
    res.send(`Event issue emmit to: ${playerId}`);
});

app.get('/connections', function(req, res){
    Object.keys(io.sockets.sockets).forEach(function(id) {
      console.log("ID:", id);
    });
    res.send('connections');
});

http.listen(app.get('port'), function() {
  console.log('listening on *:' + app.get('port'));
});