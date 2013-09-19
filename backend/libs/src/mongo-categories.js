var MongoJS = require('./mongo').MongoJS;

function MongoJSCategory(){
	/*
	**  Esta classe serve para fazer CRUD com categorias
	*/

	this._super 		= new MongoJS( 'merces' );
	this.collectionName = 'category';
	this.primaryKey 	= 'name';
	this.schema 		= {
		name 	: true,
		phone 	: true,
		image 	: true
	};
}

MongoJSCategory.prototype.insert = function( jsonQuery, callback ){
	/*
	** Adiciona uma nova categoria na collection
	** @param 		{Object} 	: query a ser feita no mongo
	** @callback 	{Boolean} 	: a categoria foi adicionada?
	*/

	var self 				= this;
	var query 				= jsonQuery;
	var isSchemaValid 		= self.isSchemaValid( query );
	var isSchemaComplete 	= self.isSchemaComplete( query );

	// valida o schema antes de executar o insert
	if ( !isSchemaValid || !isSchemaComplete ){
		callback(false);
		return;
	}
	
	// insere a categoria no banco
	self._super.insert( query, self.collectionName, function( status ){
		callback( status );
	});
};

MongoJSCategory.prototype.remove = function( jsonQuery, callback ){
	/*
	** Remove uma categoria da collection
	** @param 		{Object} 	: query a ser feita no mongo
	** @callback 	{Object} 	: a categoria foi removida?
	*/

	var self 				= this;
	var query 				= jsonQuery;
	var queryHasPrimaryKey 	= self.queryHasPrimaryKey( query );

	// verifica se a primary key foi passada
	if ( !queryHasPrimaryKey ) {
		callback( false );
		return;
	}

	// remove a categoria
	self._super.remove( query, self.collectionName, function( status ){
		callback( status );
	});
};

MongoJSCategory.prototype.findAll = function( callback ){
	/*
	** Lista as categorias da collection
	** @callback {Array<Object>} : lista de categorias em formato json
	*/

	var self = this;

	self._super.findAll( self.collectionName, function( data ){
		callback( data );
	});
};

MongoJSCategory.prototype.find = function( jsonQuery, callback ){
	/*
	** Faz uma query na collection
	** @param 		{Object} 		: query a ser feita no mongo
	** @callback 	{Array<Object>} : lista de objetos encontrados na collection
	*/

	var self 			= this;
	var query 			= jsonQuery;
	var isSchemaValid 	= self.isSchemaValid( query );

	// valida o schema antes de executar o insert
	if ( !isSchemaValid ){
		callback(false);
		return;
	}

	self._super.find( query, self.collectionName, function( data ){
		callback( data );
	});
};

MongoJSCategory.prototype.dataExists = function( jsonQuery, callback ){
	/*
	** Verifica se uma determinada categoria já existe no banco
	** @param 		{Object} 	: query para consulta no mongo em formato json
	** @callback 	{Boolean} 	: a categoria já existe?
	*/

	var self 				= this;
	var query 				= jsonQuery;
	var queryByPrimaryKey 	= { name : query.name };

	self.find( queryByPrimaryKey, function( data ){
		var dataExists = Object.keys( data ).length > 0 ? true : false;
		callback( dataExists );
	});
};

MongoJSCategory.prototype.isSchemaValid = function( jsonQuery ){
	/*
	** Verifica se o schema usado na query é valido
	** @param 	{Object} 	: query para consulta no mongo em formato json
	** @return 	{Boolean} 	: a query é valida?
	*/

	var self 				= this;
	var query 				= jsonQuery;

	// verifica se as keys usadas na query fazem parte do schema do mongo
	for( var queryKey in query ){
		if ( typeof this.schema[queryKey] === 'undefined' ) return false;
	}

	return true;
};

MongoJSCategory.prototype.isSchemaComplete = function( jsonQuery ){
	/*
	** Verifica se a query contem todos os campos do schema
	** @param {Object} 		: query para consulta no mongo em formato json
	** @return {Boolean} 	: a query possui todos os campos?
	*/

	var self 				= this;
	var query 				= jsonQuery;
	var queryLength 		= Object.keys( query ).length;
	var schemaLength 		= Object.keys( self.schema ).length;

	if ( queryLength !== schemaLength ) return false;

	return true;
};

MongoJSCategory.prototype.queryHasPrimaryKey = function( jsonQuery ){
	/*
	** Verifica se a primary key consta na query
	** @param {Object} 		: query
	** @return {Boolean} 	: a query cotem a primary key?
	*/

	var self = this;
	var query = jsonQuery;

	if ( typeof query[ self.primaryKey ] !== 'undefined' ) return true;

	return false;
};

exports.MongoJSCategory = MongoJSCategory;