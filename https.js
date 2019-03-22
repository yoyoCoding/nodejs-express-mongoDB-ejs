// var https = require('https');
var http = require('http');
var url = require('url');
var fs = require('fs');

/*var options = {
	key: fs.readFileSync('ssh_key.pem'), //ssl文件
	cert: fs.readFileSync('ssh_cert.pem') //ssl证书
}*/

/*https.createServer(options, function(req, res){
	res.writeHead(200);
	res.end('Hello Imooc');
})*/
http.createServer(function(req, res){
	//浏览器输入http://localhost:8090/news/id=123&title=test
	//获取id和title
	var path = req.url;
	var params = url.parse(req.url, true);

	res.writeHead(200, {'Content-Type':'text/html;charset="utf-8"'});
	// console.log(params);
	res.write(JSON.stringify(params.query));
	res.end('</br>Hello Imooc');
})

.listen(8090)