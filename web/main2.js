const http = require('http')
const router = require('./router')

// 静态文件托管
const server = http.createServer((req, res) => {
	// 引入封装好的静态文件路由
	router.static(req, res, './static')
})
server.on('error', err => {
	console.log(err)
})
server.listen(8090)