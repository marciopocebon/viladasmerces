var MongoJS = require('./mongo').MongoJS;

function MongoJSCategory(){
	/*
	**  Esta classe serve para fazer CRUD com categorias
	*/

	this._super 		= new MongoJS( 'merces' );
	this.collectionName = 'category';
	this.schema 		= {
		name 	: true,
		phone 	: true,
		image 	: true
	};
}

MongoJSCategory.prototype.isQueryValid = function( jsonQuery ){
	/*
	** Verifica se o schema usado na query é valido
	** @param {Object} : query para consulta no mongo em formato json
	** @return {Boolean} : a query é valida?
	*/

	var query 			= jsonQuery;
	var queryLength 	= Object.keys( query ).length;
	var schemaLength 	= Object.keys( this.schema ).length;

	console.log( queryLength, schemaLength );

	if ( queryLength !== schemaLength ) return false;

	for( var queryKey in query ){
		if ( typeof this.schema[queryKey] === 'undefined' ) return false;
	}

	return true;
};

MongoJSCategory.prototype.add = function( jsonQuery, callback ){
	/*
	** Adiciona uma categoria na collection
	** @param {Object} 		: query
	** @callback {Function} : a categoria foi adicionada?
	*/

	var self 			= this;
	var query 			= jsonQuery;
	var isQueryValid 	= self.isQueryValid( query );

	// valida a query antes de executar o insert
	if ( !isQueryValid ){
		callback(false);
		return;
	}

	self._super.insert( query, self.collectionName, function( status ){
		callback( status );
	});
};

MongoJSCategory.prototype.remove = function( jsonQuery, callback ){
	/*
	** Remove uma categoria da collection
	** @param {Object} 		: query
	** @callback {Function} : a categoria foi removida?
	*/

	var self 	= this;
	var query 	= jsonQuery;

	self._super.remove( query, self.collectionName, function( status ){
		callback( status );
	});
};

MongoJSCategory.prototype.findAll = function( callback ){
	/*
	** Lista as categorias da collection
	** @callback {Function} : json
	*/

	var self 	= this;

	self._super.findAll( self.collectionName, function( data ){
		callback( data );
	});
};

MongoJSCategory.prototype.find = function( jsonQuery, callback ){
	/*
	** Faz uma query na collection
	** @callback {Function} : json
	*/

	var self 	= this;
	var query 	= jsonQuery;

	self._super.find( query, self.collectionName, function( data ){
		callback( data );
	});
};

exports.MongoJSCategory = MongoJSCategory;