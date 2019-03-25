const express = require('express')
// 引入模块路由
const index = require('./routes/index')
const admin = require('./routes/admin')

let app = express()

/* 浏览器访问
 * localhost:3001 -> 首页
 * localhost:3001/admin -> admin模块的首页
 * localhost:3001/admin/user -> admin模块的user路由 
 */

// 配置模块路由
// app.use('/index', index)
app.use('/', index) // 首页模块
app.use('/admin', admin)

app.listen(3001, '127.0.0.1')