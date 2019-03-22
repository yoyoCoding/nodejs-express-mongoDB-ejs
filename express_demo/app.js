const Express = require('express')
let app = new Express()

app.get('/', (req, res) => {
	res.send('hello express!')
})

app.get('/news', (req, res) => {
	res.send('news模块')
})

// 动态路由 http://localhost:3000/newscontent/123
app.get('/newscontent/:id', (req, res) => {
	// 获取动态路由的传参
	const id = req.params.id
	res.send('newscontent模块：/newscontent/' + id)
})

// 获取get传值 http://localhost:3000/product?id=123
app.get('/product', (req, res) => {
	const query = req.query
	res.send('product, id:' + query.id)
})

// 端口号最好大于3000 防止被占用
app.listen(3000, '127.0.0.1')