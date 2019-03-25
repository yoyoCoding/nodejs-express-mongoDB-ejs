const express = require('express')

let router = express.Router() // 可使用 express.Router 类创建模块化,可挂载的路由句柄

router.get('/', (req, res) => {
    res.send('admin/user/index 用户页面')
})

router.get('/add', (req, res) => {
    res.send('admin/user/add 新增用户操作')
})

module.exports = router