function a(){
	console.log(arguments[0])
	console.log([].slice.apply(arguments))
	console.log(new Array(arguments))
}

a("s")