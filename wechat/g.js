'use strict'

var sha1 = require('sha1');
var prefix = 'https://api.weixin.qq.com/cgi-bin/'
var api = {
    access_token: prefix + 'token?grant_type=client_credential'
}
function Wechat (opts) {
    var that = this;
    this.appId = opts.appId;
    this.appSecret = opts.appSecret;
    this.getAccessToken = opts.getAccessToken;
    this.saveAccessToken = opts.saveAccessToken
    this.getAccessToken()
        .then(function(data) {
            try {
                data = JSON.parse(data);
            }
            catch(e) {
                return that.updateAccessToken(data)
            }

            if(that.isValidAccessToken(data)) {
                Promise.resolve(data)
            }
            else {
                return that.updateAccessToken()

            }
        })
        .then(function() {
            that.access_token = data.access_token;
            that.expires_in = data.expires_in
            that.saveAccessToken(data);
        })
}
var pt = Wechat.prototype;
pt.isValidAccessToken = function (data) {
    if (!data || !data.access_token || !data.expires_in) {
        return false;
    }
    var access_token = data.access_token;
    var expires_in = data.expires_in;
    var now = Data().now();
    if (now < expires_in){
        return true;
    }
    else {
        return false;
    }
}
pt.updateAccessToken = function () {
    var appId = this.appId;
    var appSecret = this.appSecret;
    var url = api.access_token + '&appid=' + appId + '&secret=' + appSecret;
    request({url: url, json:true}).then(function(response) {
        var dara =response[1];
        var now = Date.now();
        var
    })
}
module.exports = function (config) {
    return function * (next) {
        console.log(this.query);
        var token = config.token;
        var signature = this.query.signature;
        var nonce = this.query.nonce;
        var timestamp = this.query.timestamp;
        var echostr = this.query.echostr;
        var str = [token, timestamp, nonce].sort().join('');
        var sha = sha1(str);
        if (sha === signature) {
        	this.body = echostr + ''
        }
    }
}