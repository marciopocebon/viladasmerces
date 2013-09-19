var MongoJSCategory = require('../libs/src/mongo-categories').MongoJSCategory;
var categories 		= new MongoJSCategory();
var url 			= require('url');

exports.find = function( req, res ){
	/*
	** lista uma determinada categoria
	*/
	var query = url.parse( req.url, true ).query;

	categories.find( query, function( data ){
		res.send( data );
	});
};

exports.findAll = function( req, res ) {
	/*
	**  lista todas as categories
	*/
	categories.findAll(function( data ){
		res.send( data );
	});
};

exports.insert = function( req, res ) {
	/*
	**  cadastra uma nova categoria
	*/
	var query = url.parse( req.url, true ).query;
	// verifica se a categoria já existe no banco
	categories.dataExists( query, function( exists ){
		// se ainda nao existir, cadastra uma nova
		if ( !exists ) {
			categories.insert(query, function( status ){
				res.send( status );
				return;
			});
		}
		
		res.send( false );
	});
};

// TODO - criar os metodos abaixo
exports.remove = function( req, res ){
	/*
	**  remove uma categoria
	*/

	var query = url.parse( req.url, true ).query;

	categories.remove( query, function( status ){
		res.send( status );
	});
};

// TODO
exports.update = function(){};