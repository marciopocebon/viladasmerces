var express = require('express');
var app		= express();
var mongo= require('../lib/db/mongo');
var MongoJS= mongo.MongoJS;

function start(){
	var responseMessage	= { 
		value : true
	};

	app.use(express.bodyParser());

	// static HTML
		app.get('/add-cat', function(req, res){
			res.sendfile('./views/add-cat.html');
		});
	// ==================

	// POST
		app.post('/add-cat-node', function( req, res ){
			var data = req.body;

			var mongoInstance = new MongoJS('merces');

			mongoInstance.addCategory(data, function( success ){
				if ( !success ) {
					console.log( 'cloudnt add category' );
					responseMessage.value = false;
				}

				res.json( responseMessage );
			});
		});
	// ==================

	// JSON
		app.get('/list-cat', function(req, res){
			
			var mongoInstance = new MongoJS('merces');

			mongoInstance.findAll('category', function( data ){
				res.json( data );
			});
		});
	// ==================

	// starta o server
	app.listen(8080, function(){
		console.log('server has started on port:8080');
	});
}

exports.start = start;
