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
	// TODO
	// trocar rotas para REST ( PUT, DELETE, PUSH, etc )
	app.get('/categories/', 		categories.findAll);
	app.get('/categories/find', 	categories.find);
	app.get('/categories/insert', 	categories.insert);
	app.get('/categories/remove', 	categories.remove);

	// starta o server
	app.listen(PORT, function(){
		console.log('server has started on port:'+PORT);
	});
};

// fachada repositorio - editor
