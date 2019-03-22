const http = require('http')
const url = require('url')
const ejs = require('ejs')

// 配置路由
// 路由指的就是根据不同请求的url，处理不同的业务逻辑
// 使用ejs模版引擎，将文件渲染到浏览器页面
const server = http.createServer((req, res) => {
	const reqUrl = url.parse(req.url, true) //参数true表示将url参数转换为对象
	const pathname = reqUrl.pathname 
	const param = reqUrl.query //get方式获取请求参数
	const method = req.method.toLowerCase() //请求方式

	res.writeHeader(200, {'Content-Type': 'text/html;charset="ust-8"'})

	if(pathname == '/login') {
		// 把数据库的数据(虚拟)渲染到模板上面
		const data = {
			msg: '我是后台数据'
		}
		const list = ['111', '222', '333']
		ejs.renderFile('./views/login.ejs', {
			data: data,
			list: list
		}, (err, data) => {
			res.end(data)
		})
	} else if (pathname == '/register') {
		res.end('register')
	} else if (pathname == '/doLogin' && method == 'post') { // 执行登录操作(登录逻辑)
		let postStr = ''
		req.on('data', (chunk) => {
			postStr += chunk
		})
		req.on('end', () => {
			console.log(postStr)
			res.end(postStr)
		})
	} else {
		ejs.renderFile('./views/home.ejs', {}, (err, data) => {
			res.end(data)
		})
	}
})
server.on('error', err => {
	console.log(err)
})
server.listen(8090)