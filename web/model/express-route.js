const url = require('url')

// 封装方法改变res 绑定res.send()方法
const changeRes = function(res){
	res.send = function(data){
		res.writeHead(200,{'Content-Type':'text/html;charset="utf-8"'})
		res.end(data)
	}
}

// 暴露的模块
const server = function(){
	let G = this
	this.get = {}
	this.post = {}

	let app = function(req,res){
		changeRes(res)

		// 获取路由
		let pathname = url.parse(req.url).pathname
		if(!pathname.endsWith('/')){
			pathname = pathname + '/'
		}

		// 获取请求方式
		const method = req.method.toLowerCase()

		if(G[method][pathname]){
			// get方式
			if(method == 'get'){
				G['get'][pathname](req,res)
			// post方式
			}else{
				let postStr = ''
				req.on('data',function(chunk){
					postStr += chunk
				})
				req.on('end',function(err,chunk){
					req.body = postStr
					G['post'][pathname](req,res)
				})
			}
		} else {
			res.end('404 Not Found')
		}
	}

	app.get = function(string,callback){
		if(!string.startsWith('/')){
			string = '/' + string
		}
		if(!string.endsWith('/')){
			string = string + '/'
		}
		G['get'][string] = callback
	}

	app.post = function(string,callback){
		if(!string.startsWith('/')){
			string = '/' + string
		}
		if(!string.endsWith('/')){
			string = string + '/'
		}
		G['post'][string] = callback
	}

	return app
}

module.exports = server()