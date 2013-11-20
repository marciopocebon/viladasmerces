exports.start = function(){
	
	const PORT 		= 8080;

	var express 	= require('express');
	var app			= express();
	var root 		= require('./root');
	var crud 		= require('./crud');

	app.use(express.bodyParser());

	// root
	// app.get('/', root.index);

	// CRUD routes
	// retrieves all items
	app.get( 	'/:collection',			crud.findAll);
	// creates an item
	app.post( 	'/:collection', 		crud.insert);
	// retrieves specified item
	app.get( 	'/:collection/:name', 	crud.findOne);
	// deletes an item
	app.delete( '/:collection/:name', 	crud.remove);
	// updates an item
	app.put( 	'/:collection/:name', 	crud.findAndModify);

	// starts the server
	app.listen(PORT, function(){
		console.log('server has started on port:'+PORT);
	});
};