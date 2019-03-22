/*
 * cookie的使用
 * 安装 npm install cookie-parse
 * 引用 & 配置
 * 设置cookie: res.cookie('name', 'zhangsan', {maxAge: 900000, httpOnly: true})
 * 读取cookie: req.cookies.name
 */

const express = require('express')
const cookieParser = require('cookie-parser')
let app = express()

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

/*
 * 配置cookie-parse
 */
app.use(cookieParser())
// app.use(cookieParser('123456')) //传入一个随机字符串,可以使用加密方式设置cookie

app.use(express.static('public'))



app.get('/', (req, res) => {
	res.render('index')
})

app.get('/news', (req, res) => {
	res.send('这个是路由/news')
})

/*
 * 使用cookie-parse
 * 设置cookie
 */
app.get('/setCookie', (req, res) => {
	res.cookie('name', 'zhangsan', {maxAge: 900000})
	// res.cookie('name', 'zhangsan', {domain: '.test.com', maxAge: 900000}) // 设置域名
	// res.cookie('name', 'zhangsan', {signed: true, maxAge: 900000}) // 加密设置cookie
	res.send('设置cookie成功！')
})

/*
 * 使用cookie-parse
 * 读取cookie
 */
app.get('/getCookie', (req, res) => {
	res.send('cookie中的name为：' + req.cookies.name)
	// 加密方式设置cookie需要此种方式读取cookie
	// res.send('cookie中的name为：' + req.signedCookies.name)
})

/*
 * 使用cookie-parse
 * 删除cookie
 */
app.get('/delCookie', (req, res) => {
	res.cookie('name', '', {expires: new Date(0)})
	// res.cookie('name', '', {maxAge: 0})
	res.send('cookie删除成功')
})

/*
 * 使用cookie-parse
 * 使用domain参数(使二级域名同样能访问到cookie)
 * 1. hosts文件配置两个域名(www.test.com / news.test.com) [浏览器访问配置的域名时记得加端口号]
 * 2. 设置cookie时设置domain属性{domain: '.test.com'}
 */

/*
* 使用cookie-parse
* 使用signed参数(cookie加密)
* 加密方式1. 保存时加密(自己研究)
* 加密方式2. {signed: true} 需要在配置cookie-parser时传入一个随机字符串app.use(cookieParse('randomstring'))
*/

/*
* cookie-parse实际应用
* 记录浏览过的历史记录(记录搜索过的旅游城市)
* /lvyou?city=北京 /lvyou?city=上海...
*/
app.get('/lvyou', (req, res) => {
	let city = req.query.city || ''
	let citys = req.cookies.citys || []
	if(city){
		citys.push(city)
		res.cookie('citys', citys, {maxAge: 30 * 60 * 1000})
	}
	res.send('您现在浏览的城市是: ' + city)
})
app.get('/citys', (req, res) => {
	res.send('您浏览过的城市有: ' + req.cookies.citys)
})



app.listen(3001, '127.0.0.1')


/*
 * cookie-parse参数
 * domain 域名
 * Expires: 过期时间(秒) 在设置的某个时间点后该cookie失效 如expores=Wednesday,09-Nov-99 23:12:40 GMT
 * maxAge: 最大失效时间(毫秒) 设置在多少时间后失效
 * path: 表示cookie影响到的路径,cookie只在设置的路径下能访问
 * httpOnly: 设置了此属性 通过程序(JS脚本、applet等)将无法读取到cookie信息 防止XSS攻击
 * signed: 设置为true时,签名cookie,访问cookie需要res.signedCookies而不是res.cookies. 被篡改的cookie会被服务器拒绝,并且cookie值会重置为它的原始值
 */