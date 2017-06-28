var express= require('express'),
wsio=require('websocket.io');
var app=express.createServer();
var ws=wsio.attach(app);
app.use(express.static(__dirname));
ws.on('connection',function(socket){
	socket.on('message',function(msg){
		console.log(' \033[96mgot:\033[39m '+msg);
		socket.send("pong");
	})
});
app.listen(3003);