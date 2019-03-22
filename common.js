var http = require('http');
var querystring = require('querystring')

var postData = querystring.stringify({
	content: '一起期待下一期的课程',
	cid: 348,
	mid: 8837
});

var options = {
	hostname: 'www.imooc.com',
	// port: 80,
	path: '/course/docomment',
	method: 'POST',
	headers: {
		'Accept': 'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding': 'gzip, deflate, br',
		'Accept-Language': 'zh-CN,zh;q=0.9',
		'Connection': 'keep-alive',
		'Content-Length': postData.length,
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie': 'imooc_uuid=262f6c71-e9a1-4d38-89a9-3a586cead1fe; imooc_isnew_ct=1533094856; Hm_lvt_fb538fdd5bd62072b6a984ddbc658a16=1533094856; imooc_isnew=2; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1533094856,1533204837; loginstate=1; apsid=EyNjJjODM1MGVkZWVkMzFjYmMwYjBlM2YyMGRiODgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMTMxODQwNwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4OTUxMTczNzVAcXEuY29tAAAAAAAAAAAAAAAAAAAAADU4OGU4M2UyNDJlZTNmNDY3NGU3NzY1MTlkODQ4NWRlddliW3XZYls%3DMj; last_login_username=895117375%40qq.com; PHPSESSID=7nsfo5vc0kdrc3jgfhib5gjq81; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1533204871; cvde=5b62d968c2419-9',
		'Host': 'www.imooc.com',
		'Origin': 'https://www.imooc.com',
		'Referer': 'https://www.imooc.com/video/8837',
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.33 Safari/537.36',
		'X-Requested-With': 'XMLHttpRequest'
	}
};

var req = http.request(options, function(res){
	console.log('Status:' + res.statusCode);
	console.log('headers:' + JSON.stringify(res.headers));

	res.on('data', function(chunk){
		console.log('响应主体：' + JSON.stringify(chunk));
	});

	res.on('end', function(res){
		console.log('请求完毕~');
	})
});

req.on('error', function(e){
	console.log('请求失败：' + e.message);
})
req.write(postData);

req.end();