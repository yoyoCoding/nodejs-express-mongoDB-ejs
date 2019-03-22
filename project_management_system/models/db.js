const MongoClient = require('mongodb').MongoClient

const dbUrl = 'mongodb://localhost:27017'
const dbName = 'yytest'

let db = {
	_connect() {
		return new Promise((resolve, reject) => {
			MongoClient.connect(dbUrl, {useNewUrlParser:true}, (err, client) => {
				if(err) {
					// reject(err)
					console.log('连接数据库失败')
				} else {
					resolve(client)
				}
			})
		})
	},
	find(colName, query) {
		return new Promise((resolve, reject) => {
			this._connect().then((client) => {
				const db = client.db(dbName) // 数据库
				const col = db.collection(colName) // 数据库表(collection)

				col.find(query).toArray((error, doc) => {
					if(error) {
						// reject(error)
						console.log('查询数据失败')
					} else {
						resolve(doc)
					}
					client.close()
				})
			})
		})
	},
	insertOne(colName, query) {
		return new Promise((resolve, reject) => {
			this._connect().then((client) => {
				const db = client.db(dbName) // 数据库
				const col = db.collection(colName) // 数据库表(collection)

				col.insertOne(query, (error, doc) => {
					if(error) {
						console.log('新增数据失败')
					} else {
						resolve(doc)
					}
					client.close()
				})
			})
		})
	},
	update(colName, query) {
		return new Promise((resolve, reject) => {
			this._connect().then((client) => {
				const db = client.db(dbName) // 数据库
				const col = db.collection(colName) // 数据库表(collection)

				col.update(query, (error, doc) => {
					if(error) {
						console.log('修改数据失败')
					} else {
						resolve(doc)
					}
					client.close()
				})
			})
		})
	},
	delete(colName, query) {
		return new Promise((resolve, reject) => {
			this._connect().then((client) => {
				const db = client.db(dbName) // 数据库
				const col = db.collection(colName) // 数据库表(collection)

				col.remove(query, (error, doc) => {
					if(error) {
						console.log('删除数据失败')
					} else {
						resolve(doc)
					}
					client.close()
				})
			})
		})
	}
}

module.exports = db
