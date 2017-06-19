var fs=require('fs'),
	stats=[];
fs.readdir(process.cwd(),function(err,files){
	console.log('');
	if(!files.length){
		return console.log('   \033[31m No files to show!\033[39m\n');
	}
	console.log('   Select which file or direscory you wangt to see\n');
	function file(i){
		var filename=files[i];
		fs.stat(__dirname+'/'+filename,function(err,stat){
			stats[i]=stat;
			if(stat.isDirectory()){
				console.log('     '+i+'   \033[36m'+filename+'\033[39m');
			}
			else{
				console.log('     '+i+'   \033[90m'+filename+'\033[39m');
			}
			i++;
			if(i==files.length){
				console.log('');
				process.stdout.write('   \033[33mEnter your choice: \033[39m');
				process.stdin.resume();
				process.stdin.on('data',option);
			}
			else{
				file(i);
			}
		});
	}
	function option(data){
		var fileName=files[Number(data)];
		if(!fileName){
			process.stdout.write('   \033[31mEnter your choice: \033[39m');
		}
		else {
			process.stdin.pause();
			if(stats[Number(data)].isDirectory()){
				fs.readdir(process.cwd(),function(err,files){
					console.log('');
					console.log('   ('+files.length+' files)');
					files.forEach(function(file){
						console.log('    -   '+file);
					});
					console.log("");
				});
			}
			else{
				process.stdin.pause();
				fs.readFile(__dirname+'/'+fileName,'utf8',function(err,data){
					console.log('');
					console.log('\033[90m'+data.replace(/(.*)/g,'   $1')+'\033[39m');
				});
			}
			
		}
	}
	file(0);
})
