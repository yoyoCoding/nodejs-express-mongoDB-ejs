const http = require('http')
const app = require('./model/express-route')
const ejs = require('ejs')

// 只要有请求 就会触发app这个方法
http.createServer(app).listen(8090)


app.get('/',function(req,res){
	console.log('home')
	ejs.renderFile('./views/home.ejs',{},function(err,data){
		res.send(data)
	})
})

app.get('login',function(req,res){
	console.log('login')
	const list = ['111', '222', '333']
	ejs.renderFile('./views/login.ejs',{list:list},function(err,data){
		res.send(data)
	})
})

app.post('doLogin',function(req,res){
	console.log(req.body)
	var obj = {
		code: '200',
		msg: '登录成功!'
	}
	res.send(JSON.stringify(obj))
})
