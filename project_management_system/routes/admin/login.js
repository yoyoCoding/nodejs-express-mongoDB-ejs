const express = require('express')
const db = require('../../models/db').db
const bodyParser = require('body-parser')
const md5 = require('md5-node') // md5加密
const utils = require('../../models/utils') //工具类

let router = express.Router() // 可使用 express.Router 类创建模块化,可挂载的路由句柄

router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

router.get('/', (req, res) => {
    res.render('admin/login')
})

router.post('/doLogin', (req, res) => {
    // 获取客户端传来的参数值
    let params = req.body
    // 将客户端传来的密码加密
    params.pswd = md5(params.pswd)

    // 数据查询
    const query = {
        user: params.username
    }
    db.find('admin', query).then((doc) => {
        if (doc.length) {
            if (doc[0].pswd == params.pswd) {
                // 保存用户信息到session
                req.session.userinfo = doc[0]
                // 数据返回给客户端
                utils.end(res, '200', '登录成功', doc)
            } else {
                utils.end(res, '310', '密码不正确！')
            }
        } else {
            utils.end(res, '311', '用户不存在')
        }
    })
})

// 安全退出操作
router.post('/logout', (req, res) => {
    let resObj = {
        code: '200',
        msg: '',
        data: ''
    }
    // 销毁session
    req.session.destroy(err => {
        if (err) {
            utils.end(res, '300', '注销失败')
            return false
        }
        utils.end(res, '200', '注销成功')
    })
})

module.exports = router