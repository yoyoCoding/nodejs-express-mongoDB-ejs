const http = require('http')
const path = require('path')
const url = require('url')
const fs = require('fs')
const events = require('events')
const EventEmitter = new events.EventEmitter()
const getContentType = require('./model/getContentType')

const server = http.createServer((req, res) => {
	var pathname = url.parse(req.url).pathname
	// 默认加载首页
	if(pathname == '/') {
		pathname = '/home.html'
	}
	console.log(`请求路径为：${pathname}`)

	//过滤/favicon.ico路径
	if(pathname != '/favicon.ico') {
		// 读取路径文件
		fs.readFile('./static' + pathname, (err, file) => {
			if(err) {
				console.log('路径文件不存在')
				fs.readFile('./static/page404.html', (err404, file404) => {
					if(err404) {
						console.log(err404)
					}
					res.writeHead(404, {'Content-Type': 'text/html;charset="utf-8"'})
					res.write(file404)
					res.end()
				})
			} else { // 返回路径文件
				const extname = path.extname(pathname) // 文件后缀名
				let i = 0
				// 获取content-type的mime类型

				/*const conten_type = getContentType.getTypes(extname) 
				console.log(`MIME类型为：${conten_type}`)
				res.writeHead(200, {'Content-Type': `${conten_type};charset="utf-8"`})
				res.write(file)
				res.end()*/

				/*getContentType.getTypes(extname, mime => {
					if(mime) {
						console.log(`MIME类型为：${mime}`)
						res.writeHead(200, {'Content-Type': `${mime};charset="utf-8"`})
					}
					res.write(file)
					res.end()
				})*/

				/*getContentType.getTypes(extname).then(mime => {
					console.log(`MIME类型为：${mime}`)
					res.writeHead(200, {'Content-Type': `${mime};charset="utf-8"`})
					res.write(file)
					res.end()
				},
				err => {
					console.log(err)
				})*/

				getContentType.getTypes(EventEmitter, extname)
				EventEmitter.on('receiveData', mime => {
					i++
					console.log(`MIME类型为：${mime}---===---${i}`)
					res.writeHead(200, {'Content-Type': `${mime};charset="utf-8"`})
					// res.write(file)
					res.end(file)
				})

			}
		})

		// res.write('welcome! server on 8090')
		// res.end()
	}

})
server.on('error', err => {
	console.log(err)
})
server.listen(8090)