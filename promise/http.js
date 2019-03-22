var http = require('http');
var cheerio = require('cheerio')
var url = 'http://www.imooc.com/learn/348';

function filterChapters(html){
	var $ = cheerio.load(html,{
		normalizeWhitespace: true
	});
	var chapters = $('.chapter');
	var courseData = [];
	chapters.each(function(item){
		var $item = $(this);
		var regex = /\s{2,}/g;
		var chapterTitle = $item.find('h3').text();
		var video = $item.find('li');
		chapterTitle = chapterTitle.replace(regex,'');
		var chapterData = {
			chapterTitle: chapterTitle,
			videoData: []
		};
		video.each(function(item2){
			var $item2 = $(this);
			var id = $item2.data('media-id');
			var videoName = $item2.find('a').text();
			videoName = videoName.replace(regex,'');
			chapterData.videoData.push({
				id: id,
				videoName: videoName
			})
		})
		courseData.push(chapterData);
	})
	return courseData;
}

function printChapters(data){
	data.forEach(function(v,i){
		console.log(v.chapterTitle + '\n');
		v.videoData.forEach(function(v2,i2){
			console.log('  【' + v2.id + '】 ' + v2.videoName + '\n');
		})
	})
}

http.get(url, function(res){
	var html = '';
	res.on('data',function(data){
		html += data;
	})

	res.on('end', function(){
		var data = filterChapters(html);
		printChapters(data);
	})
}).on('error', function(){
	console.log('获取客户数据失败');
})