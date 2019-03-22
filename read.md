node版本
偶数为稳定版本
奇数为非稳定版本

### 小工具：
supervisor(实时监听文件，文件修改保存后自动重启服务 npm install supervisor)

### 小提示：
npm 局部安装包导致'不是内部或外部指令'问题,可在package.json文件的scripts选项设置快捷方式，则npm会自动寻找node_moduls文件下的.bin目录中的相关cmd命令，如：
```
"scripts": {
  "dev": "supervisor https"
}
```

nodejs: javascript执行环境

commonjs规范
模块化规范
在nodejs里面，每个js文件相当于一个模块，不需要命名空间，不用担心变量污染。

模块的分类：
核心模块
文件模块
第三方模块

模块的流程：
创建模块：test.js
导出模块：exports.add = function(){}
加载模块：var test = require('./test.js')
使用模块：test.add()


### Node.js API
url:网址解析好帮手

url.parse('urlString'[, parseQueryString])
url.parse('url',true); //以对象形式展现query
protocal,host,port,hostname,hash[锚点],query[请求数据],pathname,path,href

fromat:
url.format({protocal:'http',...})

resolve:
url.resorve('url','path')

querystring:
querystring.stringify({name:'yyy',age:18,duty:'web'},'&','=');
> 'name=yyy&age=18&duty=web'

querystring.parse('name=yyy&age=18&duty=web','&','=')
> {
	name: 'yyy',
	age: 18,
	duty: 'web'
}

querystring.escape('哈哈') //转义
>  '%E5%93%88%E5%93%88'

querystring.unescape('%E5%93%88%E5%93%88') //反转义
> '哈哈'

http：网络请求协议
请求&相应 -> http头和正文信息
http头：内容类型、服务器发送响应的日期、http状态码
正文：用户提交的表单数据

回调：具名函数，匿名函数。

cheerio
爬虫抓取网页数据工具

events.EventEmitter
官方建议相同事件最多监听10个事件，可通过设置扩大监听事件数量
var obj = new EventEmitter()
obj.setMaxListeners(11)

移除监听
obj.removeListener('事件名称',funName)
第二个参数为回调函数，必须是具名函数。否则无效
批量移除
obj.removeAllListener()
obj.removeAllListener('事件名称')

查询共监听了多少事件
obj.listeners('事件名').length


## get/request ##
http.request(options[,callback])


