var http=require('http');
http.createServer(function(req,res){
	console.log(req.headers);
	res.writeHead(200,{'Content-Type':'image/png'});
	var stream=require('fs').createReadStream('image.jpg').pipe(res);
}).listen(3000)
