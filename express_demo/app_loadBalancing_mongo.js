/*
 * session的使用
 * 多服务器负载均衡 session保存到数据库
 * 安装express-session和connect-mongo模块
 * 引用 & 配置
 */

const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
let app = express()

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

 app.use(session({
 	secret: 'signed string', // 随机string,作为服务器端生成session的签名
 	resave: false,			 // 强制保存session,即使它没有变化,默认为true
 	saveUninitialized: true,
 	store: new MongoStore({
 		url: 'mongodb://127.0.0.1:27017/yytest',
 		touchAfter: 24 * 3600 // time period in seconds 24小时内只更新一次会话,不管有多少请求(在会话数据上更改某些内容除外)
 	})
 }))

app.use(express.static('public'))


/*
 * 获取session
 */
app.get('/', (req, res) => {
	if(req.session.username) {
		res.send('welcome: ' + req.session.username)
	} else {
		res.send('首页')
	}
})

/*
 * 设置session
 */
app.get('/login', (req, res) => {
	req.session.username = 'yoyo'
	res.send('登录成功')
})



app.listen(3001, '127.0.0.1')
