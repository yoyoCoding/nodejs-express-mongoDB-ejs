const events = require('events')

const EventEmitter = new events.EventEmitter()

// 广播 & 接收广播

// 监听test广播(订阅)
EventEmitter.on('test', (data) => {
	console.log('接收到了这个广播事件')
	console.log(data)
	EventEmitter.emit('test2', '给test2传播数据')
})

// 监听test广播(订阅)
EventEmitter.on('test2', (data) => {
	console.log(data)
})

// 广播test事件(通知)
setTimeout(() => {
	EventEmitter.emit('test', '发送的数据')
},1000)