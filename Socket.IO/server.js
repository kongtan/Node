var express=require("express"),
sio=require("socket.io"),
app=express.createServer(
	express.bodyParser(),
	express.static('public')
	).listen(3003)
var io=sio.listen(app);
io.sockets.on("connection",function(socket){
	console.log('Someone connected');
	socket.on('join',function(name){
		socket.nickname=name;
		socket.broadcast.emit('announcement',name+' joined the chat.');
	});
	socket.on('text',function(msg,fn){
		socket.broadcast.emit('text',socket.nickname,msg);
		fn(Date.now())
	})
});