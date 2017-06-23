var http=require('http'),
fs=require('fs');
var server=http.createServer(function(req,res){
	console.error(' %s %s ',req.method,req.url)
	if("GET"==req.method&&'/images'==req.url.substr(0,7)&&'.jpg'==req.url.substr(-4)){
		fs.stat(__dirname+req.url,function(err,stat){
			if(err||!stat.isFile()){
				console.log(stat.isFile())
				res.writeHead(404);
				res.end('Not Found');
				return;
			}
			serve(__dirname+req.url,'image/jpeg');
		})
	}else if('GET'==req.method&&'/'==req.url){
		serve(__dirname+'/index.html','text/html');
	} else{
		res.writeHead(404);
		res.end('Not Found'); 
	}
	
	function serve(path,type){
		res.writeHead(200,{'Content-Type':type});
		fs.createReadStream(path).pipe(res);
	}
}).listen(3000);
