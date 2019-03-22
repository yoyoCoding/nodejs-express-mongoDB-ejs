// exports = function() {
// 	console.log('a')
// }
// exports = {a: 1}

// module.exports.a = 1
module.exports = function() {
	console.log('a')
}

console.log(exports === module.exports)
console.log(exports)
console.log(module.exports)