var MongoJS 	= require('./mongo').MongoJS;
var PROPERTIES 	= require('../mongo-properties').MONGO_PROPERTIES;

function MongoJSCollection( newCollectionName, newPrimaryKey, newSchema ){
	/*
	**  Esta classe serve para fazer CRUD em uma collection
	*/

	this._super 		= new MongoJS( MongoJSCollection.PROPERTIES.database );
	this.collectionName = newCollectionName;
	this.primaryKey 	= newPrimaryKey;
	this.schema 		= newSchema;
}

MongoJSCollection.PROPERTIES = PROPERTIES;

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
	isQueryValid = self._super.isQueryValid( query, self.schema, self.primaryKey );
	if ( !isQueryValid ){
		callback(false);
		return;
	}

	// verifica se os dados já existem na collection
	self._super.dataExists( query, self.primaryKey, self.collectionName, function( exists ){
		if ( exists ) {
			callback( false );
			return;
		}

		// insere o documento no banco
		self._super.insert( query, self.collectionName, function( status ){
			callback( status );
		});
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
	if ( !queryHasPrimaryKey ) {
		callback( false );
		return;
	}

	// remove o documento do banco
	self._super.remove( query, self.collectionName, function( status ){
		callback( status );
	});
};

MongoJSCollection.prototype.findAll = function( callback ){
	/*
	** Lista od documentos da collection
	** @callback {Array<Object>} : lista de documentos em formato json
	*/

	var self = this;

	self._super.findAll( self.collectionName, function( data ){
		callback( data );
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
	if ( !isSchemaValid ){
		callback(false);
		return;
	}

	// executa a query
	self._super.find( query, self.collectionName, function( data ){
		callback( data );
	});
};

exports.MongoJSCollection = MongoJSCollection;