'use strict'
var fs = require('fs');
fs.readFile('../app.js', 'utf8', function(err, content){
			console.log(err)
			console.log(content)
		})
