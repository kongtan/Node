var net=require('net');
var server=net.createServer(function(conn){
	console.log('\033[90m    new connection!\033[39m');
}).listen(3006,function(){
	console.log('\033[96m	server listening on *:3006\033[39m');
})
net.connect(3000,'localhost');
