// modules
var url 				= require('url');
var MONGO_PROPERTIES 	= require('../mongo-properties').MONGO_PROPERTIES;
var MongoJSCollection 	= require('../libs/mongo-collection').MongoJSCollection;

// instance
var categories 			= new MongoJSCollection( MONGO_PROPERTIES.collections.category.name, MONGO_PROPERTIES.collections.category.schema, MONGO_PROPERTIES.collections.category.primaryKey );

exports.find = function( req, res ){
	/*
	** lista uma determinada categoria
	*/
	var query = url.parse( req.url, true ).query;

	categories.find( query, function( err, data ){
		if (err) throw err;

		res.json( data );
	});
};

exports.findAll = function( req, res ) {
	/*
	**  lista todas as categories
	*/
	categories.findAll(function( err, data ){
		if (err) throw err;

		res.json( data );
	});
};

exports.insert = function( req, res ) {
	/*
	**  cadastra uma nova categoria
	*/
	var query = url.parse( req.url, true ).query;
	
	categories.insert(query, function( err, status ){
		if (err) throw err;

		res.json( status );
	});
};

exports.remove = function( req, res ){
	/*
	**  remove uma categoria
	*/
	var query = url.parse( req.url, true ).query;

	categories.remove( query, function( err, status ){
		if (err) throw err;

		res.json( status );
	});
};

// TODO - criar os metodos abaixo
exports.update = function(){};