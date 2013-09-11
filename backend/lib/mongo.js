var mongodb         = require('mongodb');
var MongoClient     = mongodb.MongoClient;
var Server          = mongodb.Server;

function MongoJS( dbName ){
    this.mongoClient    = new MongoClient(new Server('localhost', 27017));
    this.db             = null;
    this.dbName         = dbName;
    this.collections    = {
        categories  : 'category',
        places      : 'places'
    };
}

MongoJS.prototype._open = function( callback ){
    /*
    ** Abre uma conexão
    ** @callback
    */

    var self    = this;
    
    self.mongoClient.open( function( err, mongoClient ){
        if ( err ) {
            console.log( err );
            self._close();
            return false;
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
            return false;
        }

        self.db.collection(collectionName, function( err, collection ){
            if ( err ) {
                console.log( err );
                self._close();
                return false;
            }

            collection.find().toArray( function( err, data ) {
                if ( err ) {
                    console.log( err );
                    self._close();
                    return false;
                }
                
                callback( data );
                self._close();
            });
        });
    });
};

MongoJS.prototype.find = function( jsonQuery, collectionName, callback ){
    /*
    ** Faz uma consulta genérica na collection
    ** @param {Object}   : parametros no modelo {key:value}
    ** @param {String}   : nome da categoria
    ** @param {String}   : nome da collection 
    ** @callback {Array} : lista registros encontrados
    */

    var self            = this;
    var query           = jsonQuery;
    var collectionName  = collectionName;

    self._open(function( success ){
        if ( !success ) {
            console.log('erro no retorno da open');
            return false;
        }

        self.db.collection(collectionName, function( err, collection ){
            if ( err ) {
                console.log( err );
                self._close();
                return false;
            }

            collection.find( query ).toArray( function( err, data ) {
                if ( err ) {
                    console.log( err );
                    self._close();
                    return false;
                }
                
                self._close();
                callback( data );
            });
        });
    });
};

MongoJS.prototype.addCategory = function( categoryData, callback ){
    /*
    ** Salva uma nova categoria na collection
    ** @param {Object}      : dados da categoria
    ** @callback {Boolean}  : success/error status
    */

    var self    = this;
    var catData = categoryData;

    self._open( function(){
        self.db.collection( self.collections.categories, function( err, collection ){
            if ( err ) {
                console.log( err );
                self._close();
                return false;
            }

            collection.save( catData, {safe : true}, function( err, data ){
                if (err) {
                    console.log( err );
                    self._close();
                    return false;
                }

                self._close();
                callback( true );
            });
        });
    });
};

exports.MongoJS  = MongoJS;