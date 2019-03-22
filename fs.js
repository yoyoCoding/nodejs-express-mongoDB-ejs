var fs = require('fs')

// 1. fs.stat() 检测是文件还是目录
/*fs.stat('fs_file', (err, stat) => { //第一个参数 文件名称
	if(err) {
		console.log(err)
		return
	}
	console.log(`是文件吗：${stat.isFile()}`)
	console.log(`是目录吗：${stat.isDirectory()}`)
})*/

// 2. fs.mkdir() 创建目录
// 接收参数
// path		将创建的目录路径
// mode		目录权限（读写权限），默认0777
// callback	回调，传递异常参数err
/*fs.mkdir('./fs_mkdir', err => {
	if(err) {
		console.log(`创建目录异常：${err}`)
		return
	}
	console.log('创建目录成功')
	
})*/

// 3. fs.writeFile() 创建写入文件(文件不存在则创建，存在则覆盖)
// filename		(String)			文件名称
// data			(String | Buffer)	将要写入的内容
// options		(Object)			option数组对象，包括：
// 	·encoding	(String)			可选值，默认'utf-8'，当data是buffer时，该值应该为ignored
// 	·mode		(Number)			文件读写权限，默认为438
// 	·flag		(String)			默认值为'w'
// callback		(Function)			回调，返回一个异常参数err
/*fs.writeFile('./fs_file/writeFile.txt', 'fs.writeFile() 测试', {encoding: 'utf-8'}, err => {
	if(err) {
		console.log(err)
		return false
	}
	console.log('写入成功')
})*/

// 4. fs.appendFile() 文件追加内容(文件不存在则创建，存在则追加)
/*fs.appendFile('./fs_file/writeFile.txt', '\n这是追加内容', {encoding: 'utf-8'}, err => {
	if(err) {
		console.log(err)
		return false
	}
	console.log('追加成功')
})*/

// 5. fs.readFile() 读取文件
// filename		(String)			文件名称
// options		(Object)			option数组对象，包括：
// 	·encoding	(String)			可选值，默认'utf-8'，当data是buffer时，该值应该为ignored
// 	·mode		(Number)			文件读写权限，默认为438
// 	·flag		(String)			默认值为'w'
// callback		(Function)			回调，返回异常参数err和数据data
/*fs.readFile('./fs_file/writeFile.txt', (err, data) => {
	if(err) {
		console.log(err)
		return false
	}
	console.log(data.toString())
})*/

// 6. fs.readdir() 读取目录(将目录下的所有一级文件和文件夹全部获取)
/*fs.readdir('fs_file', (err, data) => {
	if(err) {
		console.log(err)
		return false
	}
	console.log(data)
})*/

// 7. fs.rename() 重命名
// 作用：1改名 2剪切
/*fs.rename('fs_file/yy.txt', 'fs_file/yyy.txt', err => {
	if(err) {
		console.log(err)
		return false
	}
	console.log('修改名称成功')
})*/
/*fs.rename('fs_file/yyy.txt', 'fs_file/readdir/yyy.txt', err => {
	if(err) {
		console.log(err)
		return false
	}
	console.log('剪切成功,已将yyy.txt复切到readdir目录下')
})*/

// 8. fs.rmdir() 删除目录 (只能删除目录,不能删除文件)
/*fs.rmdir('fs_file/t', err => {
	if(err) {
		console.log(err)
		return false
	}
	console.log('删除目录成功')
})*/

// 9. fs.unlink() 删除文件
/*fs.unlink('fs_file/t.txt', err => {
	if(err) {
		console.log(err)
		return false
	}
	console.log('删除文件成功')
})*/

// 10. fs.createReadStream() 流的方式读取文件
/*var readStream = fs.createReadStream('fs_file/writeFile.txt')
var str = '' // 保存读取数据
var count = 0 // 读取次数
readStream.on('data', chunk => {
	str += chunk
	count++
})
readStream.on('end', chunk => {
	console.log(str)
	console.log(`读取次数：${count}`)
})
readStream.on('error', err => {
	console.log(err)
})*/

// 11. fs.createWriteStream() 流的方式写入文件
var writeStream = fs.createWriteStream('fs_file/writeStream.txt')
var data = '这是流方式写入文件fs.createWriteStream() \n'
// writeStream.write(data, 'utf-8')
for(var i = 0; i < 10; i++) {
	writeStream.write(data, 'utf-8')
}
//标记写入完成
writeStream.end()
writeStream.on('finish', () => {
	console.log('写入完成')
})
writeStream.on('error', err => {
	console.log(err)
})

// 12. pipe()管道流
/*var readStream = fs.createReadStream('fs_file/writeFile.txt')
var writeStream = fs.createWriteStream('fs_file/writeStream.txt')
readStream.pipe(writeStream)*/


// 实际应用
// 1. 判断服务器有没有upload目录，没有就创建这个目录 (一般用于图片上传)
/*fs.stat('upload', (err, stat) => {
	if(err) {
		console.log('不存在upload目录')
		fs.mkdir('upload', error => {
			if(error) {
				console.log('创建目录失败')
				return false
			}
			console.log('创建目录成功')
			
		})
	} else {
		console.log(`目录已存在：${stat.isDirectory()}`)
	}
})*/

// 2. 找出fs_file目录下的所有目录(将文件过滤掉)，然后打印出来
/*fs.readdir('fs_file', (err, files) => {
	var dirArr = []
	if(err) {
		console.log(err)
	} else {
		console.log(files)
		for(var i = 0; i < files.length; i++) {
			((i) => {
				fs.stat('fs_file/' + files[i], (error, stat) => {
					if(error) {
						console.log(error)
						return false
					}
					if(stat.isDirectory()) {
						dirArr.push(files[i])
					}
				})
			})(i)
		}
	}
	setTimeout(() => {
		console.log('过滤后的目录：')
		console.log(dirArr)
	}, 300)
})*/