'use strict'
exports.reply = function* (next){
	var message = this.weixin;
	console.log(message)

	if (message.MsgType === 'event'){
		if(message.Event === 'subscribe'){
			if(message.EventKey){
				console.log('2weima'+ message.EventKey + '  ' + message.ticket)
			}
			this.body = 'hi! 你订阅了 ' + 'id' + message.MsgId
		}
		else if(message.Event === 'unsubscribe'){
			console.log('quxiaodingyue')
		}
		else if(message.Event === 'LOCATION') {
			this.body = '位置'+ message.Latitude +'/' + message.Longitude
			+ '-' + message.Precision
		}
		else if (message.Event === 'CLICK') {
			this.body = '您点击了菜单' + message.EventKey;
		}
		else if(message.Event ='SCAN') {
			console.log('关注后扫二维码');
			this.body = '看到你扫一下'
		}
		else if (message.Event === 'VIEW'){
			this.body='点击了菜单的链接' + message.EventKey;
		}
	}
	else if (message.MsgType ==='text'){
		var content = message.Content;
		var reply = '额，你说的'+ message.Content + '太复杂了'
		if (content === '1') {
			reply = '天下第一'
		}
		else if (content === '2') {
			reply = '22222222'
		}
		else if (content === '3') {

		}
		else if (content === '小五') {
			reply = '22222222'
		}
		else if(content === '4') {
			reply = [{
				title : '技术改变世界',
				description:'只是个描述',
				picUrl: 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png',
				url: 'http://su.baidu.com'
			}]
		}
		this.body = reply;

	}

	yield next
}
