const express = require('express')
const login = require('./admin/login')
const product = require('./admin/product')

let router = express.Router() // 可使用 express.Router 类创建模块化,可挂载的路由句柄

/* 挂载子模块路由 */
router.use('/login', login)
router.use('/product', product)

module.exports = router