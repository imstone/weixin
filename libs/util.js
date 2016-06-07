'use strict'

var fs = require('fs');
var Promise = require('bluebird');
var xml2js =require('xml2js')
exports.readFileAsyns = function(fpath, encoding){
	return new Promise(function(resolve, resject){
		fs.readFile(fpath, 'utf8', function(err, content){
			if(err) resject(err);
			else resolve(content)
		})
	})
}
exports.writeFileAsync = function(fpath, content){
	return new Promise(function(resolve, resject){
		fs.writeFile(fpath, content, function(err, content){
			if(err) resject(err);
			else resolve()
		})
	})
}
exports.parseXMLAsync = function (xml){
	return new Promise(function(resolve, resject){
		xml2js.parseString(xml,{trim:true}, function(err, content){
			if (err) resject(err)
			else resolve(content)
		})
	})
}