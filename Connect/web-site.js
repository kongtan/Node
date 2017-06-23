var connect=require('connect');
var server=connect.createServer();
server.use('/fsf',connect.static(__dirname+'/website'));
server.use('/fsf',function(req,res,next){
	console.log(2);
	next();
});
server.use(function(req,res,next){
	console.log(1)
});
server.listen(3000)