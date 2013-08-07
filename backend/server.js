var express = require('express');
var app 	= express();
var mongo 	= require('./mongo');
var fs 		= require('fs');

function start(){
	app.use(express.bodyParser());

	// renderiza
	app.get('/add-cat', function(req, res){
		res.sendfile('add-cat.html');
	});

	// recebe POST data
	app.post('/add-cat', function(req, res){
		var postData = req.body.cat;

		// verifica se a categoria já existe no banco
		mongo.nameExists( postData.name, function( err, exists ){
			if ( err ) {
				console.log( err );
			}

			if ( !exists ) {
				//salva a categoria no banco
				mongo.save( postData, function(err, data){
					if ( err ) {
						console.log( err );
					}
						
					res.send('data successfully submitted');
				});
			} else {
				res.send('data is already in database');
			}
		});
	});

	// starta o server
	app.listen(3000, function(){
		console.log('server has started');
	});
}

exports.start = start;