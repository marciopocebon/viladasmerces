var MONGO_PROPERTIES 	= require('../../config/mongodb/properties').MONGO_PROPERTIES;
var MongoJS 			= require('./database').MongoJS;
var MongoJSValidator	= require('./validator').MongoJSValidator;

/**
 * @class [responsavel por fazer CRUD]
 * @param {String} newCollectionName [nome da colecao]
 * @param {Object<json>} newSchema   [objeto json representando cada dado da collection pela chave]
 */
function MongoJSCollection( newCollectionName, newSchema ){
	this._super 		= new MongoJS( MONGO_PROPERTIES.database );
	this.collectionName = newCollectionName;
	this.schema 		= newSchema;
}

/**
 * Cadastra documentos
 * @param  {Object<json>}   jsonQuery [dados do documento]
 * @param  {Function} callback  [erro ou documento]
 * @return {void}
 */
MongoJSCollection.prototype.insert = function( jsonQuery, callback ){
	var self 			= this;
	var query 			= jsonQuery;
	var isQueryValid 	= false;

	// valida a query
	isQueryValid = MongoJSValidator.isQueryValid( query, self.schema);
	if ( !isQueryValid ) return callback('query is not valid', null);

	// insere o documento no banco
	self._super.insert( query, self.collectionName, function( err, data ){
		callback( err, data );
	});
};

/**
 * Remove documentos
 * @param  {Object<json>}   jsonQuery [parametros da consulta]
 * @param  {Function} callback  [erro ou quantidade de documentos removidos]
 * @return {void}
 */
MongoJSCollection.prototype.remove = function( jsonQuery, callback ){
	var self 	= this;
	var query 	= jsonQuery;

	self._super.remove( query, self.collectionName, function( err, data ){
		callback( err, data );
	});
};

/**
 * Retorna todos os documentos de uma collection
 * @param  {Function} callback [erro ou documentos]
 * @return {void}
 */
MongoJSCollection.prototype.findAll = function( callback ){
	var self = this;

	self._super.findAll( self.collectionName, function( err, data ){
		callback( err, data );
	});
};

/**
 * Faz uma consulta generica na collection
 * @param  {Object<json>}   jsonQuery [parametros da consulta]
 * @param  {Function} callback  [erro ou documentos encontrados]
 * @return {void}	
 */
MongoJSCollection.prototype.find = function( jsonQuery, callback ){
	var self 				= this;
	var query 				= jsonQuery;

	self._super.find( query, self.collectionName, function( err, data ){
		callback( err, data );
	});
};

/**
 * Procura e retorna um documento
 * @param  {Object<json>}   jsonQuery [parametros da consulta]
 * @param  {Function} callback  [erro ou documento]
 * @return {void}
 */
MongoJSCollection.prototype.findOne = function( jsonQuery, callback ){
	var self 				= this;
	var query 				= jsonQuery;

	self._super.findOne( query, self.collectionName, function( err, data ){
		callback( err, data );
	});
};

/**
 * Atualiza dados de um documento
 * @param  {Object<json>}   jsonQuery      [parametros da consulta]
 * @param  {Object<json>}   jsonUpdateData [novos dados do documento]
 * @param  {Function} callback       [erro ou documento]
 * @return {void}
 */
MongoJSCollection.prototype.findAndModify = function( jsonQuery, jsonUpdateData, callback ){
	/*
	** Atualiza dados de um documento na collection
	** @param 		{Object} 		: query
	** @callback 	{Array<Object>} : documento modificado
	*/

	var self 		= this;
	var query 		= jsonQuery;
    var operator 	= { '$set' : jsonUpdateData };

	self._super.findAndModify( query, operator, self.collectionName, function( err, data ){
		callback( err, data );
	});
};

exports.MongoJSCollection = MongoJSCollection;