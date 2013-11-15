var MONGO_PROPERTIES 	= require('../mongo-properties').MONGO_PROPERTIES;
var MongoJS 			= require('./mongo').MongoJS;

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
	var exists 			= false;

	// valida a query
	isQueryValid = self._super.isQueryValid( query, self.schema, self.primaryKey );
	if ( !isQueryValid ) return callback('query is not valid', null);

	// verifica se os dados já existem na collection
	exists = self._super.dataExists( query, self.primaryKey, self.collectionName );
	if ( exists ) return callback('data already exists on database', null);

	// insere o documento no banco
	self._super.insert( query, self.collectionName, function( err, status ){
		callback( err, status );
	});
};

MongoJSCollection.prototype.remove = function( jsonQuery, callback ){
	/*
	** Remove um documento da collection
	** @param 		{Object} 	: query a ser feita no mongo
	** @callback 	{Object} 	: o documento foi removido?
	*/

	var self 				= this;
	var query 				= jsonQuery;
	var queryHasPrimaryKey 	= self._super.queryHasPrimaryKey( query, self.primaryKey );

	// verifica se a primary key foi passada na query
	if ( !queryHasPrimaryKey ) return callback('primary_key is missing', null);

	// remove o documento do banco
	self._super.remove( query, self.collectionName, function( err, status ){
		callback( err, status );
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
	var isSchemaValid 		= self._super.isSchemaValid( query, self.schema );

	// valida o schema antes de executar a query
	if ( !isSchemaValid ) return callback('schema is invalid', null);

	// executa a query
	self._super.find( query, self.collectionName, function( err, data ){
		callback( err, data );
	});
};

exports.MongoJSCollection = MongoJSCollection;