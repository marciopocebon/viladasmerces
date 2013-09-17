exports.start = function(){
	
	var express 	= require('express');
	var app			= express();
	var site 		= require('./site');
	var categories 	= require('./categories');

	app.use(express.bodyParser());

	// root
	app.get('/', site.index);

	// categories
	app.get('/categories/', categories.findAll);
	app.get('/categories/add', categories.add);

	// starta o server
	app.listen(8080, function(){
		console.log('server has started on port:8080');
	});
};