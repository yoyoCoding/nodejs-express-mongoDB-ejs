const express = require('express')

let router = express.Router() // 可使用 express.Router 类创建模块化,可挂载的路由句柄

router.get('/', (req, res) => {
    res.send('admin/login/index 登录页面')
})

router.get('/doLogin', (req, res) => {
    res.send('admin/login/doLogin 登录操作')
})

module.exports = router