const http = require('http')
const url = require('url')

// 配置路由
// 路由指的就是根据不同请求的url，处理不同的业务逻辑
const server = http.createServer((req, res) => {
	// 请求/login 实现登陆功能
	// 请求/register 实现注册功能
	const pathname = url.parse(req.url).pathname
	if(pathname == '/login') {
		res.end('login')
	} else if(pathname == '/register') {
		res.end('register')
	} else {
		res.end('homepage')
	}
})
server.on('error', err => {
	console.log(err)
})
server.listen(8090)