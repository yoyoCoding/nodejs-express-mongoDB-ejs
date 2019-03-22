const fs = require('fs')
const events = require('events')
const EventEmitter = new events.EventEmitter()

// exports.getTypes = (EventEmitter, extname, callback) => {
exports.getTypes = (extname, callback) => {
	let types = []
	// 异步读取文件导致无法返回获取到的types数据
	/*fs.readFile('./mime.json', (err, data) => {
		if(err) {
			console.log(err)
			return false
		}
		types = JSON.parse(data.toString())
		EventEmitter.emit('receiveData', types[extname])
	})*/

	// 异步返回数据 方法一：改成同步获取数据
	/*const data = fs.readFileSync('./mime.json')
	types = JSON.parse(data.toString())
	return types[extname]*/

	// 异步返回数据 方法二：回调函数
	/*fs.readFile('./mime.json', (err, data) => {
		if(err) {
			console.log(err)
			return false
		}
		if(callback && typeof callback === 'function') {
			types = JSON.parse(data.toString())
			callback(types[extname])
		}
	})*/

	// 异步返回数据 方法三：promise
	return new Promise((resolve, reject) => {
		fs.readFile('./mime.json', (err, data) => {
			if(err) {
				reject(err)
			} else {
				types = JSON.parse(data.toString())
				resolve(types[extname])
			}
		})
	})

	// 异步返回数据 方法四：事件驱动
	// 在调用异步方法的文件监听广播(参考web/main.js文件)
	/*EventEmitter.on('receiveData', (data) => {
		console.log(data)
	})*/

}