var connect=require('connect'),
users=require('./users');
var ser=connect(
	connect.logger('dev'),
	connect.bodyParser(),
	connect.cookieParser(),
	connect.session({secret:'my app secret'}),
	function(req,res,next){
		if('/'==req.url&&req.session.logged_in){
			res.writeHead(200,{"Content-Type":"text/html"});
			res.end(
				'Welcome back, <b>'+req.session.name+'</b>'+
				'<a href="/logout">logout</a>'
				);
		} else{
			next();
		}
	},
	function(req,res,next){
		if('/'==req.url&&'GET'==req.method){
			res.writeHead(200,{"Content-Type":"text/html"});
			res.end([
				'<form action="/login" method="POST">',
				'<fieldset>',
				'<legend>Please log logged</legend>',
				'<p>User:<input type="text" name="user"></p>',
				'<p>Password:<input type="password" name="password"></p>',
				'<button>Submit</button>',
				'</fieldset>',
				'</form>'
				
				].join(""));
		} else {
			next();
		}
	},
	function (req,res,next){
		if('/login'==req.url&&'POST'==req.method){
			console.log(users);
			console.log(req.body);
			res.writeHead(200);
			if(!users[req.body.user]||req.body.password!=users[req.body.user].password){
				res.end('Bad username/password')
			} else{
				req.session.logged_in=true;
				req.session.name=users[req.body.user].name;
				res.end('Authenticated!');
				console.log(req.session)
			}
		} else {
			next();
		}
	},
	function(req,res,next){
		if('/logout'==req.url) {
			req.session.logged_in=false;
			res.writeHead(200);
			res.end('logged out!');
		} else {
			next();
		}
	}
	).listen(3000);