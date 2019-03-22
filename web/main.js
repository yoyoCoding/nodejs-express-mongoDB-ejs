// nodejs操作MongoDB数据库
/*step1: 安装模块npm install mogodb --save-dev
step2: 引入相关模块 var MongoClient = require('mongodb').MongoClient
// 客户端cmd输入mongo可查看本地数据库地址
step3: var url = 'mongodb://localhost:27017/database' //连接数据库地址+数据库名
step4: 连接数据库
MongoClient.connect(url, function(err,db){
	//实现增删改查
	db.collection('user').insertOne({'name':'张三'},function(err,data){})
})*/

const http = require('http')
const app = require('./model/express-route')
const ejs = require('ejs')
const MongoClient = require('mongodb').MongoClient
const dbUrl = 'mongodb://127.0.0.1:27017'
const dbName = 'yytest'

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
	const list = []
	MongoClient.connect(dbUrl,function(err,client){
		if(err){
			console.log('连接数据库失败')
			console.log(err)
			return false
		}
		let db = client.db(dbName)
		let col = db.collection('user')
		col.find({}).toArray(function(error,doc){
			if(error){
				console.log('查询数据失败')
				console.log(error)
			} else {
				// 将数据库中读取的数据渲染到页面
				ejs.renderFile('./views/login.ejs',{list:doc},function(err,data){
					res.send(data)
				})
				//关闭数据库
				client.close()
			}
		})
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

// 连接到数据库并增加数据操作
app.get('add',function(req,res){
	MongoClient.connect(dbUrl,{useNewUrlParser: true}, function(err,client){
		if(err){
			console.log('连接数据库失败')
			console.log(err)
			return false
		}
		let db = client.db(dbName)
		let col = db.collection('user')
		col.insertOne({
			name: 'yyy',
			age: 15
		},function(error,result){
			if(error){
				console.log('增加数据失败')
				console.log(error)
			} else {
				console.log('增加数据成功')
				res.send('增加数据成功')
				//关闭数据库
				client.close()
			}
		})
	})
})

// 修改数据库数据
app.get('edit',function(req,res){
	MongoClient.connect(dbUrl,function(err,client){
		if(err){
			console.log('连接数据库失败')
			console.log(err)
			return false
		}
		let db = client.db(dbName)
		let col = db.collection('user')
		col.updateOne({name: 'yyy'}, {$set: {name: 'yyy2'}}, function(error,result){
			if(error){
				console.log('更新数据失败')
				console.log(error)
			} else {
				console.log('更新数据成功')
				res.send('更新数据成功')
				//关闭数据库
				client.close()
			}
		})
	})
})

// 查询数据库数据
app.get('check',function(req,res){
	MongoClient.connect(dbUrl,function(err,client){
		if(err){
			console.log('连接数据库失败')
			console.log(err)
			return false
		}
		let db = client.db(dbName)
		let col = db.collection('user')
		// col.find({name: 'yyy2'}).toArray(function(error,doc){
		col.find({}).toArray(function(error,doc){
			if(error){
				console.log('查询数据失败')
				console.log(error)
			} else {
				console.log('查询数据成功')
				res.send(JSON.stringify(doc))
				//关闭数据库
				client.close()
			}
		})
	})
})

// 删除数据库数据
app.get('delete',function(req,res){
	MongoClient.connect(dbUrl,function(err,client){
		if(err){
			console.log('连接数据库失败')
			console.log(err)
			return false
		}
		let db = client.db(dbName)
		let col = db.collection('user')
		col.deleteOne({name: 'yyy2'}, function(error,result){
			if(error){
				console.log('删除数据失败')
				console.log(error)
			} else {
				console.log('删除数据成功')
				res.send('删除数据成功')
				//关闭数据库
				client.close()
			}
		})
	})
})