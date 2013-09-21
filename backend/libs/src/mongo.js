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
    this.collections    = {
        categories  : 'category',
        places      : 'places',
        users       : 'users'
    };
}

MongoJS.prototype._open = function( callback ){
    /*
    ** Abre uma conexão
    ** @callback
    */

    var self = this;
    
    self.mongoClient.open( function( err, mongoClient ){
        if ( err ) {
            console.log( err );
            self._close();
            callback( false );
            return;
        }

        self.db = self.mongoClient.db( self.dbName );
        console.log('database on');
        callback( true );
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
    var success;

    self._open( function(){
        self.db.collection( collectionName, function( err, collection ){
            if ( err ) {
                console.log( err );
                self._close();
                callback( false );
                return;
            }

            collection.save( query, {safe : true}, function( err, data ){
                if (err) {
                    console.log( err );
                    self._close();
                    callback( false );
                    return;
                }

                success = Object.keys( data ).length > 0 ? true : false;
                self._close();
                callback( success );
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
    var dataRemoved;

    self._open( function(){
        self.db.collection( collectionName, function( err, collection ){
            if ( err ) {
                console.log( err );
                self._close();
                callback( false );
                return;
            }

            collection.remove( query, true, function( err, affected_rows ){
                if (err) {
                    console.log( err );
                    self._close();
                    callback( false );
                    return;
                }

                dataRemoved = affected_rows > 0 ? true : false;
                self._close();
                callback( dataRemoved );
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

    self._open(function( success ){
        if ( !success ) {
            console.log('erro no retorno da open');
            callback( false );
            return;
        }

        self.db.collection(collectionName, function( err, collection ){
            if ( err ) {
                console.log( err );
                self._close();
                callback( false );
                return;
            }

            collection.find().toArray( function( err, data ) {
                if ( err ) {
                    console.log( err );
                    self._close();
                    callback( false );
                    return;
                }
                
                self._close();
                callback( data );
            });
        });
    });
};

MongoJS.prototype.find = function( jsonQuery, collectionName, callback ){
    /*
    ** Faz uma consulta genérica na collection
    ** @param {Object}   : parametros no modelo {key:value}
    ** @param {String}   : nome da collection 
    ** @callback {Array} : lista registros encontrados
    */

    var self            = this;
    var query           = jsonQuery;
    var collectionName  = collectionName;

    self._open(function( success ){
        if ( !success ) {
            console.log('erro no retorno da open');
            callback( false );
            return;
        }

        self.db.collection(collectionName, function( err, collection ){
            if ( err ) {
                console.log( err );
                self._close();
                callback( false );
                return;
            }

            collection.find( query ).toArray( function( err, data ) {
                if ( err ) {
                    console.log( err );
                    self._close();
                    callback( false );
                    return;
                }
                
                self._close();
                callback( data );
            });
        });
    });
};

MongoJS.prototype.dataExists = function( jsonQuery, collectionName, callback ){
    /*
    ** Verifica se um documento já existe na collection a partir de uma query
    ** @param       {Object}    : query para consulta no mongo em formato json
    ** @param       {String}    : nome da collection
    ** @callback    {Boolean}   : o documento já existe?
    */

    var self       = this;
    var query      = jsonQuery;
    var collection = collectionName;         

    self.find( query, collection, function( data ){
        var exists = Object.keys( data ).length > 0 ? true : false;
        callback( exists );
    });
};

MongoJS.prototype.isSchemaValid = function( jsonQuery, schemaCollection ){
    /*
    ** Verifica se as keys passadas na query fazem parte do schema da collection
    ** @param   {Object}    : query
    ** @param   {Object}    : schema
    ** @return  {Boolean}   : a query é valida?
    */

    var self    = this;
    var query   = jsonQuery;
    var schema  = schemaCollection;

    for( var key in query ){
        if ( typeof schema[ key ] === 'undefined' ) return false;
    }

    return true;
};

MongoJS.prototype.isSchemaComplete = function( jsonQuery, schemaCollection ){
    /*
    ** Verifica se a query contem a mesma quantidade de campos que o schema da collection
    ** @param {Object}      : query
    ** @param {Object}      : schema
    ** @return {Boolean}    : a query possui todos os campos?
    */

    var self         = this;
    var query        = jsonQuery;
    var schema       = schemaCollection;
    var queryLength  = Object.keys( query ).length;
    var schemaLength = Object.keys( schema ).length;

    if ( queryLength !== schemaLength ) return false;

    return true;
};

MongoJS.prototype.queryHasPrimaryKey = function( jsonQuery, primaryKeyCollection ){
    /*
    ** Verifica se a primary key consta na query
    ** @param {Object}      : query
    ** @param {String}      : nome da primary da collection
    ** @return {Boolean}    : a query cotem a primary key?
    */

    var self        = this;
    var query       = jsonQuery;
    var primaryKey  = primaryKeyCollection;

    if ( typeof query[ primaryKey ] !== 'undefined' ) return true;

    return false;
};

exports.MongoJS  = MongoJS;