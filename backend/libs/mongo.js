var mongodb         = require('mongodb');
var MongoClient     = mongodb.MongoClient;
var Server          = mongodb.Server;

/**
 * @class [responsavel por manipular conexao com banco e fazer queries em collections]
 * @param {String} dbName [nome do banco de dados]
 */
function MongoJS( dbName ){
    this.mongoClient    = new MongoClient(new Server('localhost', 27017));
    this.db             = null;
    this.dbName         = dbName;
}

/**
 * Abre uma conexao
 * @param  {Function} callback [erro ou objeto conexao]
 * @return {void}
 */
MongoJS.prototype._open = function( callback ){
    var self = this;
    
    self.mongoClient.open(function( err, mongoClient ){
        if (err) {
            self._close();
            return callback( err, null );
        }

        self.db = self.mongoClient.db( self.dbName );
        console.log('database on');
        callback(null, mongoClient);
    });
};

/**
 * Fecha uma conexao
 * @return {void}
 */
MongoJS.prototype._close = function(){
    var self = this;

    self.mongoClient.close();
    console.log('database off');
};

/**
 * Cadastra um novo documento na collection
 * @param  {Object<json>}   jsonQuery      [dados do documento]
 * @param  {String}   collectionName [nome da collection]
 * @param  {Function} callback       [erro ou documento]
 * @return {void}
 */
MongoJS.prototype.insert = function( jsonQuery, collectionName, callback ){
    var self            = this;
    var collectionName  = collectionName;
    var query           = jsonQuery;

    self._open( function( err, mongoClient ){
        if (err) {
            self._close();
            return callback( err, null );
        }
        self.db.collection( collectionName, function( err, collection ){
            if (err) {
                self._close();
                return callback( err, null );
            }

            collection.insert( query, {safe : true}, function( err, data ){
                if (err) {
                    self._close();
                    return callback( err, null );
                }

                self._close();
                callback( null, data );
            });
        });
    });
};

/**
 * Delete documentos de uma collection
 * @param  {Object<json>}   jsonQuery      [parametros para consulta]
 * @param  {String}   collectionName [nome da colecao]
 * @param  {Function} callback       [erro ou quantidade de documentos deletados]
 * @return {void}
 */
MongoJS.prototype.remove = function( jsonQuery, collectionName, callback ){
    var self            = this;
    var collectionName  = collectionName;
    var query           = jsonQuery;

    self._open( function( err, mongoClient ){
        if (err) {
            self._close();
            return callback( err, null );
        }
        self.db.collection( collectionName, function( err, collection ){
            if (err) {
                self._close();
                return callback( err, null );
            }

            collection.remove( query, true, function( err, data ){
                if (err) {
                    self._close();
                    return callback( err, null );
                }

                self._close();
                callback( null, data );
            });
        });
    });
};

/**
 * Retorna todos os documentos da collection
 * @param  {String}   collectionName [nome da colecao]
 * @param  {Function} callback       [erro ou documentos]
 * @return {void}
 */
MongoJS.prototype.findAll = function( collectionName, callback ){
    var self            = this;
    var collectionName  = collectionName;

    self._open( function( err, mongoClient ){
        if (err) {
            self._close();
            return callback( err, null );
        }
        self.db.collection(collectionName, function( err, collection ){
            if (err) {
                self._close();
                return callback( err, null );
            }

            collection.find().toArray( function( err, data ) {
                if (err) {
                    self._close();
                    return callback( err, null );
                }
                
                self._close();
                callback( null, data );
            });
        });
    });
};

/**
 * Faz uma consulta e retorna todos os documentos encontrados
 * @param  {Object<json>}   jsonQuery      [parametros para consulta]
 * @param  {String}   collectionName [nome da colecao]
 * @param  {Function} callback       [erro ou documentos]
 * @return {void}
 */
MongoJS.prototype.find = function( jsonQuery, collectionName, callback ){
    var self            = this;
    var query           = jsonQuery;
    var collectionName  = collectionName;

    self._open( function( err, mongoClient ){
        if (err) {
            self._close();
            return callback( err, null );
        }
        self.db.collection(collectionName, function( err, collection ){
            if (err) {
                self._close();
                return callback( err, null );
            }

            collection.find( query ).toArray( function( err, data ) {
                if (err) {
                    self._close();
                    return callback( err, null );
                }
                
                self._close();
                callback( null, data );
            });
        });
    });
};

/**
 * Faz uma busca por 1 documento
 * @param  {Object<json>}   jsonQuery      [parametros para consulta] 
 * @param  {String}   collectionName [nome da colecao]
 * @param  {Function} callback       [erro ou documento]
 * @return {void}
 */
MongoJS.prototype.findOne = function( jsonQuery, collectionName, callback ){
    var self            = this;
    var query           = jsonQuery;
    var collectionName  = collectionName;

    self._open( function( err, mongoClient ){
        if (err) {
            self._close();
            return callback( err, null );
        }
        self.db.collection(collectionName, function( err, collection ){
            if (err) {
                self._close();
                return callback( err, null );
            }

            collection.findOne( query, function( err, data ) {
                if (err) {
                    self._close();
                    return callback( err, null );
                }
                
                self._close();
                callback( null, data );
            });
        });
    });
};

/**
 * Atualiza dados de um documento
 * @param  {Object<json>}   jsonQuery      [parametros para consulta]
 * @param  {Object<json>}   jsonOperator   [operador do mongodb: $set, $unset]
 * @param  {String}   collectionName [nome da colecao cadastrada no mongodb]
 * @param  {Function} callback       [erro ou documento]
 * @return {void}
 */
MongoJS.prototype.findAndModify = function( jsonQuery, jsonOperator, collectionName, callback ){
    var self            = this;
    var collectionName  = collectionName;
    var query           = jsonQuery;
    var operator        = jsonOperator;
    var sort            = [];
    var options         = { 'new' : true };

    self._open( function( err, mongoClient ){
        if (err) {
            self._close();
            return callback( err, null );
        }
        self.db.collection(collectionName, function( err, collection ){
            if (err) {
                self._close();
                return callback( err, null );
            }

            collection.findAndModify( query, sort, operator, options, function( err, data ) {
                if (err) {
                    self._close();
                    return callback( err, null );
                }
                
                self._close();
                callback( null, data );
            });
        });
    });
};

exports.MongoJS  = MongoJS;