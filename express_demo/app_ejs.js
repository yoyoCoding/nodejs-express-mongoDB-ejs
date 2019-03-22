const path = require('path')
const express = require('express')
let app = express()

// 在express中使用ejs 安装完ejs后无需引入可直接使用(模版后缀名为ejs)
// app.set('view engine', 'ejs')

// 注册html模版引擎
app.engine('html', require('ejs').renderFile)
// 将模版引擎替换为html
app.set('view engine', 'html')

// 设置模版路径(默认是views文件夹下，可以设置为其他文件夹)
app.set('views', __dirname + '/views')

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