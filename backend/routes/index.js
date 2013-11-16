exports.start = function(){
	
	const PORT 		= 8080;

	var express 	= require('express');
	var app			= express();
	var site 		= require('./site');
	var categories 	= require('./categories');

	app.use(express.bodyParser());

	// root
	app.get('/', site.index);

	// categories
	app.get( 	'/categories', 			categories.findAll);
	app.post( 	'/categories', 			categories.insert);
	app.get( 	'/categories/:name', 	categories.findOne);
	app.delete( '/categories/:name', 	categories.remove);
	
	// app.push( 	'/categories/:name', 	categories.findAndModify);
	// app.push( 	'/categories', 			categories.update);

	// starta o server
	app.listen(PORT, function(){
		console.log('server has started on port:'+PORT);
	});
};