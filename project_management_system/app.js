const express = require('express')
// 引入模块路由
const index = require('./routes/index')
const admin = require('./routes/admin')

let app = express()


// 配置模块路由
app.use('/', index) // 首页模块
app.use('/admin', admin)

app.listen(3001, '127.0.0.1')