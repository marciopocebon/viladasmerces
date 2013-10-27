var MongoJSCollection 	= require('../libs/mongo-collection').MongoJSCollection;
var PROPERTIES 			= {
	collection 	: MongoJSCollection.PROPERTIES.collections.category.name,
	schema 		: MongoJSCollection.PROPERTIES.collections.category.schema,
	primaryKey 	: MongoJSCollection.PROPERTIES.collections.category.primaryKey
};
var categories 			= new MongoJSCollection( PROPERTIES.collection, PROPERTIES.schema, PROPERTIES.primaryKey );
var url 				= require('url');

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
	
	categories.insert(query, function( status ){
		res.send( status );
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