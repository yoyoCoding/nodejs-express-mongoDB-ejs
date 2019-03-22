var http = require('http');
var cheerio = require('cheerio');
var baseUrl = 'http://www.imooc.com/learn/';
var videoIds = [348,259,197,134,75];

function filterChapters(html){
	var $ = cheerio.load(html,{
		normalizeWhitespace: true
	});
	var chapters = $('.chapter');
	var course_infos = $('.course-infos');
	var coursName = course_infos.find('h2').text();
	var studyNum = course_infos.find('.js-learn-num').text();
	var courseData = {
		coursName: coursName,
		studyNum:studyNum,
		chapter: []
	};
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
		courseData.chapter.push(chapterData);
	})
	return courseData;
}

function printChapters(data){
	data.forEach(function(v,i){
		console.log('### 课程： ' + v.coursName + ' 学习人数为：' + v.studyNum + '\n');
		v.chapter.forEach(function(chapter){
			console.log(' ' + chapter.chapterTitle + '\n');
			chapter.videoData.forEach(function(v2,i2){
				console.log('   【' + v2.id + '】 ' + v2.videoName + '\n');
			})
		})
	})
}

function getPageInfo(url){
	return new Promise((resolve,reject) => {
		console.log('正在爬取：'+url);
		http.get(url, function(res){
			var html = '';
			res.on('data',function(data){
				html += data;
			})
			res.on('end', function(){
				resolve(html);
			})
		}).on('error', function(err){
			reject(err)
		})
	});
}

let fetchCourseArray = [];
videoIds.forEach(function(id){
	let promise = getPageInfo(baseUrl + id);
	fetchCourseArray.push(promise);
})

Promise.all(fetchCourseArray).then((res) => {
	var courseData = [];
	res.forEach(function(html){
		var eachCourseData = filterChapters(html);
		courseData.push(eachCourseData);
	})
	printChapters(courseData);
})