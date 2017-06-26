var connect=require('connect'),
time=require('./request-time');
var server=connect.createServer();
server.use(connect.logger('dev'));
server.use(time({time:500}));
server.use('/a',function(req,res,next){
	res.writeHead(200);
	res.end('Fast!');
});
server.use('/b',function(req,res,next){
	setTimeout(function(){
		res.writeHead(200);
		res.end('Slow!');
	},1000)
});
server.listen(3000);
