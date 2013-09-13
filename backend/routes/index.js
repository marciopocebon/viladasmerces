var express 	= require('express');
var app			= express();
var site 		= require('./site');
var categories 	= require('./categories');

function start(){

	app.use(express.bodyParser());

	// root
	app.get('/', site.index);

	// categories
	app.all('/categories/:pizzarias', categories.list);

	// starta o server
	app.listen(8080, function(){
		console.log('server has started on port:8080');
	});
}

exports.start = start;