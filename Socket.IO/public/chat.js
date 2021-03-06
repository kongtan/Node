window.onload=function(){
	var socket=io.connect();
	socket.on('connect',function(){
		socket.emit('join',prompt('What is your nickname?'));
		document.getElementById('chat').style.display='block';
	})
	socket.on('announcement',function(msg){
		var li=document.createElement('li');
		li.className='announcement';
		li.innerHTML=msg;
		document.getElementById('message').appendChild(li);
	})
	var input=document.getElementById('input');
	document.getElementById('form').onsubmit=function(){
		var li=addMessage('me',input.value);
		socket.emit('text',input.value,function(date){
			li.className='confirm';
			li.title=date;
		});
		input.value="";
		input.focus();
		return false;
	}
	function addMessage(from,text){
		var li=document.createElement('li');
		li.className='message';
		li.innerHTML='<b>'+from+'</b>:'+text;
		document.getElementById('message').appendChild(li);
		return li;
	}
	socket.on('text',addMessage);
}