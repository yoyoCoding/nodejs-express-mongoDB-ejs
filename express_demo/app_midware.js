/*中间件：就是匹配路由之前喝路由之后做的一系列操作*/

const express = require('express')
const bodyParser = require('body-parser')
let app = express()

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

/*
 * 第三方中间件
 * body-parser(获取post提交的参数)配置 (需安装和引用)
*/
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())

/*
 * 内置中间件
 * 静态文件托管 express.static中间件
*/
app.use(express.static('public'))
// app.use('/static', express.static('public')) // 虚拟目录(路由)

/*
 * 中间件 表示匹配任何路由
 * 应用级中间件
 * next() 路由继续向下匹配
*/
app.use((req, res, next) => {
	console.log(new Date())
	next()
})

/*
 * 中间件 只匹配/news路由
*/
app.use('/news', (req, res, next) => {
	console.log('路由中间件app.use')
	next()
})


app.get('/', (req, res) => {
	res.render('index')
})

/*
 * 路由中间件
*/
app.get('/news', (req, res, next) => {
	console.log('这个是路由中间件')
	next()
})

app.get('/news', (req, res) => {
	res.send('这个是路由/news')
})

app.get('/login', (req, res) => {
	res.render('login')
})

/*
 * 第三方中间件
 * body-parser获取post提交的参数
*/
app.post('/doLogin', (req, res) => {
	let parmas = req.body // body-parser使用
	console.log(parmas)
	res.send(parmas)
})

/*
 * 错误处理中间件 匹配任何路由 404
*/
app.use((req, res) => {
	res.status(404).send('404 Not Found')
})


app.listen(3001, '127.0.0.1')