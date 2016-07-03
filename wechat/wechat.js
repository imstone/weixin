'use strict'
var Promise = require('bluebird');

var request = Promise.promisify(require('request'));
var prefix = 'https://api.weixin.qq.com/cgi-bin/';
var util = require('./util')
var api = {
    access_token: prefix + 'token?grant_type=client_credential',
    upload: 'media/upload?'
}
function Wechat (opts) {
    var that = this;

    this.appId = opts.appID;
    this.appSecret = opts.appSecret;
    this.getAccessToken = opts.getAccessToken;
    this.saveAccessToken = opts.saveAccessToken
    this.fetchAccessToken();
}
var pt = Wechat.prototype;
pt.isValidAccessToken = function (data) {
    if (!data || !data.access_token || !data.expires_in) {
        return false;
    }

    var access_token = data.access_token;
    var expires_in = data.expires_in;
    var now = Date.now();
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
    return new Promise (function (resolve, reject) {
        request({url: url, json:true}).then(function(response) {
            var data =response[1];
            var now = Date.now();
            var expires_in = now + (data.expires_in - 20) * 1000;
            data.expires_in = expires_in;
            resolve(data);
        })
    })
}

pt.fetchAccessToken = function () {
    var that = this;
    if (this.access_token && this.expires_in) {
        if (this.isValidAccessToken(this)) {
            return Promise.resolve(this)
        }
    }
    this.getAccessToken()
        .then(function(data) {

            try {
                //data = JSON.parse(data);
            }
            catch(e) {
                return that.updateAccessToken()
            }

            if (that.isValidAccessToken(data)) {
                return Promise.resolve(data)
            }
            else {
                return that.updateAccessToken()

            }
        })
        .then(function(data) {
            that.access_token = data.access_token;
            that.expires_in = data.expires_in
            that.saveAccessToken(data);
            return Promise.resolve(data)
        })

    var appId = this.appId;
    var appSecret = this.appSecret;
    var url = api.access_token + '&appid=' + appId + '&secret=' + appSecret;
    return new Promise (function (resolve, reject) {
        request({url: url, json:true}).then(function(response) {
            var _data =response[1];
            var now = Date.now();
            var expires_in = now + (data.expires_in - 20) * 1000;
            data.expires_in = expires_in;
            resolve(data);
        })
    })
}


pt.upLoadMaterial = function (type, filepath) {
    var that = this;
    var form = {
        media: fs.createReadStream(filepath)
    }

    var appId = this.appId;
    var appSecret = this.appSecret;
    return new Promise (function (resolve, reject) {
        that
            .fetchAccessToken()
            .then(function(data){
                var url = api.upload + 'access_token=' + data.access_token + '&type=' + type;

                request({method: 'POST', url: url, formData:form, json: true }).then(function (response) {
                    var data =response[1];
                    if (data) {
                        resolve(data);
                    }
                    else {
                        throw new Error('Upload material fails');
                    }
                    // var now = Date.now();
                    // var expires_in = now + (data.expires_in - 20) * 1000;
                    // data.expires_in = expires_in;
                    // resolve(data);
                })
                .catch(function (err) {
                    reject(err)
                })
            })
    })
}
pt.reply = function () {
    var content = this.body;
    var message = this.weixin;

    var xml  = util.tpl(content, message);
    console.log(xml)
    this.status =200;
    this.type = 'application/xml';
    this.body = xml;

}
module.exports = Wechat;