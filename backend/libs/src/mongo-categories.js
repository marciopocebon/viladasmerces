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
	var isSchemaValid 		= self._super.isSchemaValid( query, self.schema );
	var isSchemaComplete 	= self._super.isSchemaComplete( query, self.schema );

	// valida a query
	if ( !isSchemaValid || !isSchemaComplete ){
		callback(false);
		return;
	}

	// verifica se o dado já existe na collection
	self._super.dataExists( query, self.collectionName, function( exists ){
		if ( exists ) {
			callback( false );
			return;
		}

		// insere a categoria no banco
		self._super.insert( query, self.collectionName, function( status ){
			callback( status );
		});
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
	var queryHasPrimaryKey 	= self._super.queryHasPrimaryKey( query, self.primaryKey );

	// verifica se a primary key foi passada
	if ( !queryHasPrimaryKey ) {
		callback( false );
		return;
	}

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
	** @callback 	{Array<Object>} : documentos encontrados na collection
	*/

	var self 				= this;
	var query 				= jsonQuery;
	var isSchemaValid 		= self._super.isSchemaValid( query, self.schema );

	// valida o schema antes de executar o insert
	if ( !isSchemaValid ){
		callback(false);
		return;
	}

	self._super.find( query, self.collectionName, function( data ){
		callback( data );
	});
};

exports.MongoJSCategory = MongoJSCategory;