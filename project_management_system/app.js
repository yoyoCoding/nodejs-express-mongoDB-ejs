const express = require('express')
const session = require('express-session')

// 引入模块路由
const index = require('./routes/index')
const admin = require('./routes/admin')

let app = express()

// 配置模版引擎
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/static', express.static('public'))
app.use('/upload', express.static('upload'))

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 1000 * 60 * 30
	},
	rolling: true
}))

// 自定义中间件
app.use((req, res, next) => {
	// ejs设置全局变量,所有模版可直接访问
	app.locals['userinfo'] = req.session.userinfo || { user: 'test', pswd: '***' }
	next()
})


// 配置模块路由
app.use('/', index) // 首页模块
app.use('/admin', admin)

app.listen(3001, '127.0.0.1')