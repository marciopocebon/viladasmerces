var MongoJS = require('../libs/mongo').MongoJS;

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
var mongodb         = require('mongodb');
var MongoClient     = mongodb.MongoClient;
var Server          = mongodb.Server;

function MongoJS( dbName ){
    /*
    ** Esta classe serve para manipular conexao com banco e fazer queries genericas em collections
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

MongoJS.prototype.insert = function( jsonQuery, collectionName, callback ){
    /*
    ** Salva um novo item na collection
    ** @param {Object}      : query
    ** @param {String}      : nome da collection
    ** @callback {Boolean}  : success/error status
    */

    var self            = this;
    var collectionName  = collectionName;
    var query           = jsonQuery;

    self._open( function(){
        self.db.collection( collectionName, function( err, collection ){
            if ( err ) {
                console.log( err );
                self._close();
                return false;
            }

            collection.save( query, {safe : true}, function( err, affected_rows ){
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

MongoJS.prototype.remove = function( jsonQuery, collectionName, callback ){
    /*
    ** Deleta um documento da collection
    ** @param {Object} : query
    ** @param {String} : nome da collection
    ** @callback {Function} : o documento foi deletado?
    */

    var self            = this;
    var collectionName  = collectionName;
    var query           = jsonQuery;

    self._open( function(){
        self.db.collection( collectionName, function( err, collection ){
            if ( err ) {
                console.log( err );
                self._close();
                return false;
            }

            collection.remove( query, true, function( err, affected_rows ){
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

exports.MongoJS  = MongoJS;