const express = require('express')
const bodyParser = require('body-parser') // 获取post方式提交参数
const multiparty = require('multiparty') // 获取表单提交文件
const session = require('express-session')
const md5 = require('md5-node') // md5加密
const db = require('./models/db') //数据库操作模块
const utils = require('./models/utils') //工具类

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
app.use('/upload', express.static('upload'))

// 自定义中间件 权限管理
// 如果未登录则跳转到登录页面
app.use((req, res, next) => {
	// if(req.url == '/login' || req.url == '/doLogin') {
	// 	next()
	// } else {
	// 	if(!req.session.userinfo){
	// 		res.redirect('/login')
	// 	} else {
	// 		// ejs设置全局变量,所有模版可直接访问
			app.locals['userinfo'] = req.session.userinfo || {user: 'test', pswd: '***'}
			next()
	// 	}
	// }
})

// 首页
app.get('/', (req, res) => {
	let product_list = []
	// 查询数据
	db.find('product', {}).then(doc => {
		// 数据返回给客户端
		product_list = doc
		res.render('index', {list: product_list})
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

	// 数据查询
	const query = {
		user: params.username
	}
	db.find('admin', query).then((doc) => {
		if(doc.length) {
			if(doc[0].pswd == params.pswd) {
				// 保存用户信息到session
				req.session.userinfo = doc[0]
				// 数据返回给客户端
				utils.end(res, '200', '登录成功', doc)
			} else {
				utils.end(res, '310', '密码不正确！')
			}
		} else {
			utils.end(res, '311', '用户不存在')
		}
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
			utils.end(res, '300', '注销失败')
			return false
		}
		utils.end(res, '200', '注销成功')
	})
})

// 新增产品操作
app.post('/addProduct', (req, res) => {
	console.log('add')
	let form = new multiparty.Form({
		uploadDir: 'upload'
	})
	form.parse(req, (err, fields, files) => {
		// console.log(JSON.stringify(fields))
		// console.log(JSON.stringify(files))
		const query = {
			title: fields.title[0],
			price: fields.price[0],
			fee: fields.fee[0],
			pic: files.pic[0].path
		}
		db.insertOne('product', query).then(data => {
			// {n:1, ok:1}
			utils.end(res, '200', '添加成功')
		})
	})
})

// 编辑产品操作
app.post('/editProduct', (req, res) => {
	let form = new multiparty.Form({
		uploadDir: 'upload'
	})
	form.parse(req, (err, fields, files) => {
		const query = {
			title: fields.title[0],
			price: fields.price[0],
			fee: fields.fee[0],
			pic: files.pic[0].path
		}
		db.insertOne('product', query).then(data => {
			// {n:1, ok:1}
			utils.end(res, '200', '添加成功')
		})
	})
})

app.listen(3001, '127.0.0.1')