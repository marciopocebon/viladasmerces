var MONGO_PROPERTIES 	= require('../config/mongodb/properties').MONGO_PROPERTIES;
var MongoJSCollection 	= require('../libs/mongodb/collection').MongoJSCollection;
var MongoJSValidator 	= require('../libs/mongodb/validator').MongoJSValidator;

exports.findOne = function( req, res ){
	/*
	** lista um unico documento
	*/

	var collection 	= null;
	var crud 		= null;
	var query 		= null;

	// verifica se a collection existe
	if ( !(req.params.collection in MONGO_PROPERTIES.collections) ) return res.json( 'collection does not exists' );
	
	// obtem propriedades da collection
	collection = MONGO_PROPERTIES.collections[req.params.collection];
	
	// instancia o objeto crud
	crud = new MongoJSCollection( collection.name, collection.schema, collection.primaryKey );

	// extrai parametros da URL
	query = { name : req.params.name };

	// faz a consulta
	crud.findOne( query, function( err, data ){
		if (err) res.json(err);

		res.json( data );
	});
};

exports.findAll = function( req, res ) {
	/*
	**  lista todos documentos
	*/

	var collection 	= null;
	var crud 		= null;

	// verifica se a collection existe
	if ( !(req.params.collection in MONGO_PROPERTIES.collections) ) return res.json( 'collection does not exists' );
	
	// obtem propriedades da collection
	collection = MONGO_PROPERTIES.collections[req.params.collection];
	
	// instancia o objeto crud
	crud = new MongoJSCollection( collection.name, collection.schema, collection.primaryKey );

	// faz a consulta
	crud.findAll(function( err, data ){
		if (err) res.json(err);

		res.json( data );
	});
};

exports.insert = function( req, res ) {
	/*
	**  cadastra um novo documento
	*/

	var collection 	= null;
	var crud 		= null;
	var query 		= null;

	// verifica se a collection existe
	if ( !(req.params.collection in MONGO_PROPERTIES.collections) ) return res.json( 'collection does not exists' );
	
	// obtem propriedades da collection
	collection = MONGO_PROPERTIES.collections[req.params.collection];
	
	// instancia o objeto crud
	crud = new MongoJSCollection( collection.name, collection.schema, collection.primaryKey );
	
	// extrai os dados da requisicao
	query = req.body;
	
	// faz a consulta
	crud.insert(query, function( err, data ){
		if (err) res.json(err);

		res.json( data );
	});
};

exports.remove = function( req, res ){
	/*
	**  remove um documento
	*/

	var collection 	= null;
	var crud 		= null;
	var query 		= null;

	// verifica se a collection existe
	if ( !(req.params.collection in MONGO_PROPERTIES.collections) ) return res.json( 'collection does not exists' );
	
	// obtem propriedades da collection
	collection = MONGO_PROPERTIES.collections[req.params.collection];
	
	// instancia o objeto crud
	crud = new MongoJSCollection( collection.name, collection.schema, collection.primaryKey );

	// extrai parametros da URL
	query = { name : req.params.name };
	
	// faz a consulta
	crud.remove( query, function( err, data ){
		if (err) res.json(err);

		res.json( data );
	});
};

exports.findAndModify = function( req, res ){
	/*
	**  atualiza um documento
	*/

	var collection 	= null;
	var crud 		= null;
	var query 		= null;

	// verifica se a collection existe
	if ( !(req.params.collection in MONGO_PROPERTIES.collections) ) return res.json( 'collection does not exists' );
	
	// obtem propriedades da collection
	collection = MONGO_PROPERTIES.collections[req.params.collection];
	
	// instancia o objeto crud
	crud = new MongoJSCollection( collection.name, collection.schema, collection.primaryKey );

	// extrai parametros da URL
	query 		= { name : req.params.name };
	
	// extrai os novos dados
	updateData 	= req.body;
	
	crud.findAndModify( query, updateData, function( err, data ){
		if (err) res.json(err);

		res.json( data );
	});	
};