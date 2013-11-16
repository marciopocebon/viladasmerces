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
	// gets all items
	app.get( 	'/categories', 			categories.findAll);
	// creates an item
	app.post( 	'/categories', 			categories.insert);
	// gets specified item
	app.get( 	'/categories/:name', 	categories.findOne);
	// deletes an item
	app.delete( '/categories/:name', 	categories.remove);
	// updates an item
	app.put( 	'/categories/:name', 	categories.findAndModify);

	// starta o server
	app.listen(PORT, function(){
		console.log('server has started on port:'+PORT);
	});
};