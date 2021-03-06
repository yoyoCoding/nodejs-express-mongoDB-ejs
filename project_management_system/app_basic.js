const express = require('express')
const bodyParser = require('body-parser') // 获取post方式提交参数
const session = require('express-session')
const MongoClient = require('mongodb').MongoClient
const md5 = require('md5-node') // md5加密

const dbUrl = 'mongodb://localhost:27017'
const dbName = 'yytest'

let app = express()

// 配置模板引擎
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
// app.locals['userinfo'] = '123' // ejs配置公共数据,所有模版共享的数据

// 配置body-parser 以获取post方式提交的数据
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// 配置express-session
app.use(session({
	secret: 'signed string',
	name: 'session_id',
	resave: false,
	saveUninitialized: true,
	// session失效设置: 30分钟内用户不操作页面则session失效
	cookie: {
		maxAge: 30 * 60 * 1000
	},
	rolling: true
}))

// 静态文件托管 中间件express.static
app.use('/static', express.static('public'))

// 自定义中间件 权限管理
// 如果未登录则跳转到登录页面
app.use((req, res, next) => {
	if(req.url == '/login' || req.url == '/doLogin') {
		next()
	} else {
		if(!req.session.userinfo){
			res.redirect('/login')
		} else {
			// ejs设置全局变量,所有模版可直接访问
			app.locals['userinfo'] = req.session.userinfo
			next()
		}
	}
})

// 首页
app.get('/', (req, res) => {
	let product_list = []
	// 连接数据库
	MongoClient.connect(dbUrl, (err, client) => {
		if(err) {
			res.send('连接数据库失败')
			return false
		}
		const db = client.db(dbName) // 数据库名
		const col = db.collection('product') // 数据库表(collection)
		col.find({}).toArray((error, doc) => {
			// 数据返回给客户端
			product_list = doc
			res.render('index', {list: product_list})
			
			client.close()
		})
	})
})

// 登录页
app.get('/login', (req, res) => {
	res.render('login')
})

app.get('/product', (req, res) => {
	res.send('product列表')
})

// 登录操作
app.post('/doLogin', (req, res) => {
	// 获取客户端传来的参数值
	let params = req.body
	// 将客户端传来的密码加密
	params.pswd = md5(params.pswd)

	let resObj = {
		code: '200',
		msg: '',
		data: []
	}
	// 连接数据库
	MongoClient.connect(dbUrl, (err, client) => {
		if(err) {
			resObj.code = '300'
			resObj.msg = '连接数据库失败'
			res.send(resObj)
			return false
		}
		const db = client.db(dbName) // 数据库名
		const col = db.collection('admin') // 数据库表(collection)
		col.find({user: params.username}).toArray((error, doc) => {
			if(error) {
				resObj.code = '301'
				resObj.msg = '查询数据失败'
				res.send(resObj)
				return false
			}
			if(doc.length) {
				if(doc[0].pswd == params.pswd) {
					// 保存用户信息到session
					req.session.userinfo = doc[0]
					// 数据返回给客户端
					resObj.code = '200'
					resObj.msg = '登录成功！'
					resObj.data = doc
					res.send(resObj)
				} else {
					resObj.code = '310'
					resObj.msg = '密码不正确！'
					res.send(resObj)
				}
			} else {
				resObj.code = '311'
				resObj.msg = '用户不存在'
				res.send(resObj)
			}
			
			client.close()
		})
	})
})
// 安全退出操作
app.post('/logout', (req, res) => {
	let resObj = {
		code: '200',
		msg: '',
		data: ''
	}
	// 销毁session
	req.session.destroy(err => {
		if(err) {
			resObj.code = '300'
			resObj.msg = '注销失败'
			res.send(resObj)
			return false
		}
		resObj.msg = '注销成功'
		res.send(resObj)
	})
})

app.listen(3001, '127.0.0.1')