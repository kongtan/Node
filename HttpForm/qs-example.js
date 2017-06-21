var querystring=require('querystring');
console.log(querystring.parse('name=Guillermo').name);
console.log(querystring.parse('q=guilermo+rauch'));