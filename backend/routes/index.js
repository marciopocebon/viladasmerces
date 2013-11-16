exports.start = function(){
	
	const PORT 		= 8080;

	var express 	= require('express');
	var app			= express();
	var root 		= require('./root');
	var categories 	= require('./categories');
	var places 		= require('./places');

	app.use(express.bodyParser());

	// root
	app.get('/', root.index);

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

	// places
	// gets all items
	app.get( 	'/places', 			places.findAll);
	// creates an item
	app.post( 	'/places', 			places.insert);
	// gets specified item
	app.get( 	'/places/:name', 	places.findOne);
	// deletes an item
	app.delete( '/places/:name', 	places.remove);
	// updates an item
	app.put( 	'/places/:name', 	places.findAndModify);

	// starta o server
	app.listen(PORT, function(){
		console.log('server has started on port:'+PORT);
	});
};