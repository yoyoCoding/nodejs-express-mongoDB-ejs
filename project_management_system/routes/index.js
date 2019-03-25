const express = require('express')

let router = express.Router() // 可使用 express.Router 类创建模块化,可挂载的路由句柄

router.get('/', (req, res) => {
    res.send('homepage index')
})

router.get('/product', (req, res) => {
    res.send('homepage product')
})

module.exports = router