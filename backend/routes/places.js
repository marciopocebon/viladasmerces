// modules
var url 				= require('url');
var MONGO_PROPERTIES 	= require('../mongo-properties').MONGO_PROPERTIES;
var MongoJSCollection 	= require('../libs/mongo-collection').MongoJSCollection;

// instance
var places = new MongoJSCollection( MONGO_PROPERTIES.collections.places.name, MONGO_PROPERTIES.collections.places.schema, MONGO_PROPERTIES.collections.places.primaryKey );

exports.findOne = function( req, res ){
	/*
	** lista um determinado local
	*/

	var query = { name : req.params.name };

	places.findOne( query, function( err, data ){
		if (err) res.json(err);

		res.json( data );
	});
};

exports.findAll = function( req, res ) {
	/*
	**  lista todos os locais
	*/

	places.findAll(function( err, data ){
		if (err) res.json(err);

		res.json( data );
	});
};

exports.insert = function( req, res ) {
	/*
	**  cadastra um novo local
	*/
	
	var query = req.body;
	
	places.insert(query, function( err, data ){
		if (err) res.json(err);

		res.json( data );
	});
};

exports.remove = function( req, res ){
	/*
	**  remove um local
	*/

	var query = { name : req.params.name };
	
	places.remove( query, function( err, data ){
		if (err) res.json(err);

		res.json( data );
	});
};

exports.findAndModify = function( req, res ){
	/*
	**  atualiza um local
	*/

	var query 		= { name : req.params.name };
	var updateData 	= req.body;
	
	places.findAndModify( query, updateData, function( err, data ){
		if (err) res.json(err);

		res.json( data );
	});	
};