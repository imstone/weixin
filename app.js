'use strict'

var Koa = require('koa');
var wechat = require('./wechat/g');
var config = {
    appID: 'wx4f4bfd59e2e2d8ab',
    appSecret: 'RFVvQJV7DmRbjxztcqwhFkJo2YuVMsn62zmxv0vMNwF',
    token: 'fe178weixin'
}
var app = new Koa(wechat(config));
app.use()
app.listen(1234);
console.log('123')