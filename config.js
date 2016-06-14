'use strict'

var util = require('./libs/util');
var path = require('path');
var wechat_file = path.join(__dirname, './config/wexin.txt');

var config = {
    appID: 'wx4f4bfd59e2e2d8ab',
    appSecret: '9008d71b8297f48b673357852945fcbb',
    token: 'fe178weixin',
    getAccessToken: function (){
        // 读取配置文件
    	return util.readFileAsyns(wechat_file)
    },
    saveAccessToken: function (data){
    	data = JSON.stringify(data)
    	return util.writeFileAsync(wechat_file,data)
    }
}
module.exports = config;
