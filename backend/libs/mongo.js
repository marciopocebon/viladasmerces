// references
// http://mongodb.github.io/node-mongodb-native/markdown-docs/insert.html

var mongodb         = require('mongodb');
var MongoClient     = mongodb.MongoClient;
var Server          = mongodb.Server;

function MongoJS( dbName ){
    /*
    ** Esta classe serve para manipular conexao com banco e fazer queries genericas em collections
    ** @param {String} : nome do banco de dados
    */
    
    this.mongoClient    = new MongoClient(new Server('localhost', 27017));
    this.db             = null;
    this.dbName         = dbName;
}

MongoJS.prototype._open = function( callback ){
    /*
    ** Abre uma conexão
    ** @callback
    */

    var self = this;
    
    self.mongoClient.open( function( err, mongoClient ){
        if (err) {
            self._close();
            return callback( err, null );
        }

        self.db = self.mongoClient.db( self.dbName );
        console.log('database on');
        callback();
    });
};

MongoJS.prototype._close = function(){
    /*
    ** Fecha uma conexão
    */

    var self = this;

    self.mongoClient.close();

    console.log('database off');
};

MongoJS.prototype.insert = function( jsonQuery, collectionName, callback ){
    /*
    ** Salva um novo item na collection
    ** @param {Object}      : query
    ** @param {String}      : nome da collection
    ** @callback {Boolean}  : os dados foram inseridos na collection?
    */

    var self            = this;
    var collectionName  = collectionName;
    var query           = jsonQuery;

    self._open( function( err ){
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

MongoJS.prototype.remove = function( jsonQuery, collectionName, callback ){
    /*
    ** Deleta um documento da collection
    ** @param {Object}      : query
    ** @param {String}      : nome da collection
    ** @callback {Function} : o documento foi deletado?
    */

    var self            = this;
    var collectionName  = collectionName;
    var query           = jsonQuery;

    self._open( function( err ){
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

MongoJS.prototype.findAll = function( collectionName, callback ){
    /*
    ** Retorna todos registros encontrados na collection
    ** @param {String}      : nome da collection
    ** @callback {Array}    : lista de registros
    */
    var self            = this;
    var collectionName  = collectionName;

    self._open( function( err ){
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

MongoJS.prototype.find = function( jsonQuery, collectionName, callback ){
    /*
    ** Faz uma consulta genérica na collection e retorna multiplos documentos
    ** @param {Object}   : parametros no modelo {key:value}
    ** @param {String}   : nome da collection 
    ** @callback {Array} : lista registros encontrados
    */

    var self            = this;
    var query           = jsonQuery;
    var collectionName  = collectionName;

    self._open( function( err ){
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

MongoJS.prototype.findOne = function( jsonQuery, collectionName, callback ){
    /*
    ** Faz uma consulta genérica na collection e retorna somente 1 documento
    ** @param {Object}   : parametros no modelo {key:value}
    ** @param {String}   : nome da collection 
    ** @callback {Array} : lregistro encontrado
    */

    var self            = this;
    var query           = jsonQuery;
    var collectionName  = collectionName;

    self._open( function( err ){
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

exports.MongoJS  = MongoJS;