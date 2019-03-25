const express = require('express')
const login = require('./admin/login')
const user = require('./admin/user')

let router = express.Router() // 可使用 express.Router 类创建模块化,可挂载的路由句柄

/* 挂载子模块路由 */
router.use('/login', login)
router.use('/user', user)

module.exports = router