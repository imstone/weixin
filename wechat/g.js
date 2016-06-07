'use strict'

var sha1 = require('sha1');
var Wechat = require('./wechat');
var util = require('./util');
var getRawBody = require('raw-body');
var prefix = 'https://api.weixin.qq.com/cgi-bin/'
var api = {
    access_token: prefix + 'token?grant_type=client_credential'
}

module.exports = function (config, handler) {
    var wechat = new Wechat(config);
    return function * (next) {
        var token = config.token;
        var signature = this.query.signature;
        var nonce = this.query.nonce;
        var timestamp = this.query.timestamp;
        //var echostr = this.query.echostr;
        var str = [token, timestamp, nonce].sort().join('');
        var sha = sha1(str);
        if(this.method==='GET'){
            if (sha === signature) {
            	this.body = 'echostr' + '';
            }
            else {
                this.body = 'wrong';
            }
        }
        else if (this.method==='POST'){
            if (sha !== signature) {
                this.body = 'wrong';
                return false;
            }
            var data = yield getRawBody(this.req, {
                length: this.length,
                limit: '1mb',
                encoding: this.charset
            })
            var content = yield util.parseXMLAsync(data);
            var message = util.formatMessage(content.xml);
            this.weixin = message;
            yield handler.call(this, next);
            wechat.reply.call(this);

            console.log(message)
        }
    }
}