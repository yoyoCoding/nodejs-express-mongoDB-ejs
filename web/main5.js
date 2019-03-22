const http = require('http')
const url = require('url')
const ejs = require('ejs')

let G = {}

// 定义方法开始结束
var app = function(req, res){
	let pathname = url.parse(req.url).pathname
	if(!pathname.endsWith('/')){
	    pathname=pathname+'/'
	}
	console.log('pathname is: ' + pathname)
	if(G[pathname]){
		G[pathname](req,res)
	}
}

// 定义一个get方法
app.get = function(string,callback){
	if(!string.endsWith('/')){
	    string=string+'/'
	}
	if(!string.startsWith('/')){
	    string='/'+string
	}
	console.log('string is: ' + string)
	G[string]=callback
	console.log(G)
}

// 只要有请求 就会触发app这个方法
http.createServer(app).listen(8090)

// 注册路由
app.get('login',function(req,res){
	res.end('login')
})
app.get('register',function(req,res){
	res.end('register')
})