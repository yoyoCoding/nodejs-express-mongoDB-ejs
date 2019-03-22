const utils = {
	end(res, code, msg, data) {
		res.send({
			code: code,
			msg: msg,
			data
		})
	}
}

module.exports = utils