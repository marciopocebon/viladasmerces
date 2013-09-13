var MongoJS = require('./mongo').MongoJS;

function MongoJSCategory(){
	/*
	**  Esta classe serve para fazer CRUD com categorias
	*/

	this._super 		= new MongoJS( 'merces' );
	this.collectionName = 'category';
}

MongoJSCategory.prototype.add = function( jsonquery, callback ){
	/*
	** Adiciona uma categoria na collection
	** @param {Object} 		: query
	** @callback {Function} : a categoria foi adicionada?
	*/

	var self 	= this;
	var query 	= jsonquery;

	self._super.insert( query, self.collectionName, function( status ){
		callback( status );
	});
};

MongoJSCategory.prototype.remove = function( jsonquery, callback ){
	/*
	** Remove uma categoria da collection
	** @param {Object} 		: query
	** @callback {Function} : a categoria foi removida?
	*/

	var self 	= this;
	var query 	= jsonquery;

	self._super.remove( query, self.collectionName, function( status ){
		callback( status );
	});
};

MongoJSCategory.prototype.list = function( callback ){
	/*
	** Lista as categorias da collection
	** @callback {Function} : json
	*/

	var self 	= this;

	self._super.findAll( self.collectionName, function( status ){
		callback( status );
	});
};

exports.MongoJSCategory = MongoJSCategory;