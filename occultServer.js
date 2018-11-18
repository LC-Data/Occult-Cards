var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res, thisUser){
	res.sendFile(__dirname + '/index.html');

});

app.get('/join', function(req, res){
  res.sendFile(__dirname + '/join.html');
});




io.on('connection', function(socket){
	var thisUser;
	console.log(`Ancient magicks calls another...`);

	socket.on('disconnect', function(){
	    console.log('user disconnected');
	});

	socket.on('chat message', function(thisUser, msg){
		console.log(`${thisUser} says: ${msg}`);
		io.emit('chat message', thisUser, msg);
	});

	socket.on('user sets name', function(userName){
		thisUser = userName;
		var destination = '/';
		console.log(`${thisUser} has set their username.`);
		io.emit('redirect', destination, thisUser);
	});

});





http.listen(port, function(){
  console.log('listening on *:' + port);
});