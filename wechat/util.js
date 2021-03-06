'use strict'

var fs = require('fs');
var Promise = require('bluebird');
var xml2js =require('xml2js')
var tpl = require('./tpl');
exports.parseXMLAsync = function (xml){
	return new Promise(function(resolve, resject){
		xml2js.parseString(xml,{trim:true}, function(err, content){
			if (err) resject(err)
			else resolve(content)
		})
	})
}


function formatMessage(result) {
	var message = {};
	if (typeof result === 'object'){

		var keys = Object.keys(result);

		for(var i=0 ; i< keys.length; i++){
			var item = result[keys[i]];
			var key = keys[i];
			if (!(item instanceof Array) || item.length === 0){
				continue
			}
			if (item.length === 1){
				var val = item[0];

				if (typeof val === 'object') {
					message[key] = formatMessage(val);
				}
				else {
					message[key] = (val || '').trim();
				}
			}
			else {
				message[key] = [];
				for (var j = 0, k = item.length; j < k ; j++){
					message[key].push(formatMessage(item[j]))
				}
			}
		}
	}
	return message

}
exports.formatMessage = formatMessage;

exports.tpl = function  (content, message) {
	var info = {};
	var type = 'text';
	var fromUserName = message.FromUserName;
	var toUserName = message.ToUserName;
	var type = message.MsgType;


	if (Array.isArray(content)){
		type = 'news'
	}
	//type = content.type || type;
	info.content = content;
	info.createTime = Date.now();
	info.msgType = type;
	info.toUserName = fromUserName;
	info.fromUserName = toUserName;

	return tpl.compiled(info);
}


