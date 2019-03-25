const express = require('express')
const db = require('../../models/db').db
const ObjectId = require('../../models/db').ObjectId
const bodyParser = require('body-parser')
const multiparty = require('multiparty')
const utils = require('../../models/utils')

let router = express.Router() // 可使用 express.Router 类创建模块化,可挂载的路由句柄

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

// 产品列表页
router.get('/', (req, res) => {
    let product_list = []
    // 查询数据
    db.find('product', {}).then(doc => {
        // 数据返回给客户端
        product_list = doc
        res.render('admin/product', { list: product_list })
    })
})

// 新增产品操作
router.post('/addProduct', (req, res) => {
    let form = new multiparty.Form({
        uploadDir: 'upload'
    })
    console.log(form.parse)
    form.parse(req, (err, fields, files) => {
        if(err) {
            console.log(err)
            return false
        }
        // console.log(JSON.stringify(fields))
        // console.log(JSON.stringify(files))
        const query = {
            title: fields.title[0],
            price: fields.price[0],
            fee: fields.fee[0],
            pic: files.pic[0].path
        }
        db.insertOne('product', query).then(data => {
            // {n:1, ok:1}
            utils.end(res, '200', '添加成功')
        })
    })
})

// 查询产品信息操作
router.get('/checkProduct', (req, res) => {
    const query = {
        _id: ObjectId(req.query.id)
    }
    db.find('product', query).then(doc => {
        utils.end(res, '200', '', doc[0])
    })
})

// 修改产品信息
router.post('/editProduct', (req, res) => {
    const params = req.body
    const query = {
        _id: ObjectId(params.id)
    }
    const updateFields = {
        title: params.title,
        price: params.price,
        fee: params.fee
    }
    db.updateOne('product', query, updateFields).then(doc => {
        utils.end(res, '200', '修改数据成功')
    })
})

// 删除产品
router.post('/delProduct', (req, res) => {
    const query = {
        _id: ObjectId(req.body.id)
    }
    db.deleteOne('product', query).then(doc => {
        utils.end(res, '200', '删除成功')
    })
})

module.exports = router