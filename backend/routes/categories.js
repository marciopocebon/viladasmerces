var MongoJSCategory = require('../libs/src/mongo-categories').MongoJSCategory;
var categories 		= new MongoJSCategory();
var url 			= require('url');

exports.findAll = function( req, res ) {
	/*
	**  lista todas as categories
	*/
	categories.findAll(function( data ){
		res.send( data );
	});
};

exports.add = function( req, res ) {
	/*
	**  cadastra uma nova categoria
	*/
	var query = url.parse( req.url, true ).query;
	categories.dataExists( query, function( status ){
		if ( !status ) {
			categories.add(query, function( status ){
				res.send( status );
			});
		} else {
			res.send( 'nothing here' );
		}
	});
};

// TODO - criar os metodos abaixo
exports.remove = function(){};
exports.update = function(){};