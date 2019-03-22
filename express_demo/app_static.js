const path = require('path')
const express = require('express')
let app = express()

// 注册html模版引擎
app.engine('html', require('ejs').renderFile)
// 将模版引擎替换为html
app.set('view engine', 'html')

/*静态文件托管 express.static中间件
不使用express.static中间件会导致css、js等静态资源路径在路由中寻找
给public文件夹下的静态文件提供托管服务 可以以路由方式访问
http://localhost:3001/css/style.css
http://localhost:3001/js/app.js
http://localhost:3001/images/test.png*/
app.use(express.static('public'))
// app.use('static/', express.static('public')) // 配置虚拟目录http://localhost:3001/static/css/style.css

app.get('/', (req, res) => {
	// 渲染页面 自动查找views目录下的ejs文件
	res.render('index')
})

app.get('/news', (req, res) => {
	let list = ['111', '222', '333']
	res.render('news', {
		list: list
	})
})


// 获取get传值 http://localhost:3000/product?id=123
app.get('/product', (req, res) => {
	const query = req.query
	res.send('product, id:' + query.id)
})

app.listen(3001, '127.0.0.1')