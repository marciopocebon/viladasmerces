// modules
var MONGO_PROPERTIES 	= require('../mongo-properties').MONGO_PROPERTIES;
var MongoJS 			= require('./mongo').MongoJS;
var MongoJSValidator	= require('./mongo-validator').MongoJSValidator;

function MongoJSCollection( newCollectionName, newSchema, newPrimaryKey ){
	/*
	**  Esta classe serve para fazer CRUD em uma collection
	*/

	this._super 		= new MongoJS( MONGO_PROPERTIES.database );
	this.collectionName = newCollectionName;
	this.schema 		= newSchema;
	this.primaryKey 	= newPrimaryKey;
}

MongoJSCollection.prototype.insert = function( jsonQuery, callback ){
	/*
	** Adiciona um novo documento na collection
	** @param 		{Object} 	: query a ser feita no mongo
	** @callback 	{Boolean} 	: o documento foi adicionado?
	*/

	var self 			= this;
	var query 			= jsonQuery;
	var isQueryValid 	= false;

	// valida a query
	isQueryValid = MongoJSValidator.isQueryValid( query, self.schema, self.primaryKey );
	if ( !isQueryValid ) return callback('query is not valid', null);

	// insere o documento no banco
	self._super.insert( query, self.collectionName, function( err, data ){
		callback( err, data );
	});
};

MongoJSCollection.prototype.remove = function( jsonQuery, callback ){
	/*
	** Remove um documento da collection
	** @param 		{Object} 	: query a ser feita no mongo
	** @callback 	{Object} 	: o documento foi removido?
	*/

	var self 	= this;
	var query 	= jsonQuery;

	self._super.remove( query, self.collectionName, function( err, data ){
		callback( err, data );
	});
};

MongoJSCollection.prototype.findAll = function( callback ){
	/*
	** Lista os documentos da collection
	** @callback {Array<Object>} : lista de documentos em formato json
	*/

	var self = this;

	self._super.findAll( self.collectionName, function( err, data ){
		callback( err, data );
	});
};

MongoJSCollection.prototype.find = function( jsonQuery, callback ){
	/*
	** Faz uma query na collection
	** @param 		{Object} 		: query
	** @callback 	{Array<Object>} : documentos encontrados na collection
	*/

	var self 				= this;
	var query 				= jsonQuery;

	self._super.find( query, self.collectionName, function( err, data ){
		callback( err, data );
	});
};

MongoJSCollection.prototype.findOne = function( jsonQuery, callback ){
	/*
	** Faz uma query na collection
	** @param 		{Object} 		: query
	** @callback 	{Array<Object>} : documentos encontrados na collection
	*/

	var self 				= this;
	var query 				= jsonQuery;

	self._super.findOne( query, self.collectionName, function( err, data ){
		callback( err, data );
	});
};

exports.MongoJSCollection = MongoJSCollection;