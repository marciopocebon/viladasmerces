var express = require('express');
var app 	= express();
var mongo 	= require('./mongo');
var MongoJS = mongo.MongoJS;
var fs 		= require('fs');

function start(){
	app.use(express.bodyParser());

	// exemplo de POST via form
	app.post('/add-cat', function( req, res ){
		var data = req.body.cat;

		var mongoInstance = new MongoJS('merces');
		mongoInstance.addCategory(data, function( success ){
			if ( !success ) {
				console.log( 'cloudnt addCategory' );
				return false;
			}

			res.redirect('/list-cat');
		});
	});

	// exemplo retorno dados
	app.get('/list-cat', function(req, res){
		var mongoInstance = new MongoJS('merces');
		mongoInstance.findAll('cat', function( data ){
			res.send( data );
		});
	});

	// exemplo renderizacao HTML
	app.get('/add-cat', function(req, res){
		res.sendfile('add-cat.html');
	});

	// starta o server
	app.listen(3000, function(){
		console.log('server has started');
	});
}

exports.start = start;