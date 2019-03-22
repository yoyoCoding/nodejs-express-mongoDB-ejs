/*
 * session的使用
 * 安装 npm install express-session
 * 引用 & 配置
 * 设置session: req.session.name = 'zhangsan'
 * 读取session: req.session.name
 * req.session.cookie.maxAge=0; //重新设置cookie的过期时间
 */

const express = require('express')
const session = require('express-session')
let app = express()

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

/*
 * 配置express-session中间件
 */
 app.use(session({
 	secret: 'signed string', // 随机string,作为服务器端生成session的签名
 	name: 'session_id', 	 // 返回客户端的key的名称, 默认为connect.sid
 	resave: false,			 // 强制保存session,即使它没有变化,默认为true
 	saveUninitialized: true, // 强制将未初始化的session存储, 默认为true
 	cookie: {
 		// secure: true,		// https这样的情况才可以访问cookie
 		maxAge: 1000*30*60	 // 最大过期时间
 	},
 	rolling: true			 //  在每次请求时强行设置cookie,这将重置cookie 过期时间,默认：false (即只要在maxAge时间内用户操作页面则重置过期时间(从0开始数)cookie不会过期)
 }))

app.use(express.static('public'))


/*
 * 获取session
 */
app.get('/', (req, res) => {
	if(req.session.name) {
		res.send('你好, ' + req.session.name + ', 欢迎回来！')
	} else {
		res.send('首页-未登录')
	}
})

/*
 * 设置session
 */
app.get('/login', (req, res) => {
	req.session.name = 'zhangsan'
	res.send('登录成功')
})

/*
 * 销毁session
 */
app.get('/logout', (req, res) => {
	// req.session.cookie.maxAge = 0
	req.session.destroy(err => {
		console.log('销毁失败')
	})
	res.send('注销成功')
})


app.listen(3001, '127.0.0.1')
