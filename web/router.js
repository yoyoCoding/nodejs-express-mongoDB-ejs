const path = require('path')
const url = require('url')
const fs = require('fs')

const getContentType = require('./model/getContentType')

exports.static = (req, res, staticPath) => { // staticPath: 存放静态文件目录(html等文件)
	var pathname = url.parse(req.url).pathname
	// 默认加载首页
	if(pathname == '/') {
		pathname = '/home.html'
	}

	//过滤/favicon.ico路径
	if(pathname != '/favicon.ico') {
		// 读取路径文件
		fs.readFile(staticPath + pathname, (err, file) => {
			if(err) {
				console.log('路径文件不存在')
				fs.readFile(staticPath + '/page404.html', (err404, file404) => {
					if(err404) {
						console.log(err404)
					}
					res.writeHead(404, {'Content-Type': 'text/html;charset="utf-8"'})
					res.write(file404)
					res.end()
				})
			} else { // 向客户端返回路径文件
				const extname = path.extname(pathname) // 文件后缀名
				getContentType.getTypes(extname).then(mime => {
					console.log(`文件类型为:${mime}`)
					res.writeHead(200, {'Content-Type': `${mime};charset="utf-8"`})
					res.write(file)
					res.end()
				},
				err => {
					console.log(err)
				})

			}
		})
	}
}