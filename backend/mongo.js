var mongodb         = require('mongodb');
var MongoClient     = mongodb.MongoClient;
var Server          = mongodb.Server;
var mongoClient     = null;
var db 		        = null;
var dbName          = 'merces';
var collectionName  = 'cat';

/*
** Salva uma nova categoria
** @param {Object}   : dados da categoria que será adicionada
** @return {Object} : dados da categoria adicionada
*/
function save( data, callback ) {
    mongoClient = new MongoClient(new Server('localhost', 27017));
    console.log('database opened');

    mongoClient.open(function(err, mongoClient) {

        db = mongoClient.db( dbName );

        db.collection(collectionName, function(err, collection){
            if ( err ) {
                console.log( 'collection not found' );
                mongoClient.close();
                console.log('database closed');
            }

            collection.save( data, {safe : true}, function(err, returnedData){
                if (err) {
                    console.log( err );
                }

                mongoClient.close();
                console.log('database closed');

                callback( err, returnedData );
            });
        });
    });
}

/*
** Verifica se o nome já existe na collection
** @param {String}   : nome da categoria
** @return {Boolean}
*/
function nameExists( string, callback ){
    mongoClient = new MongoClient(new Server('localhost', 27017));
    console.log('database opened');

    mongoClient.open(function(err, mongoClient) {

        db = mongoClient.db( dbName );

        db.collection(collectionName, function(err, collection){
            if ( err ) {
                console.log( 'collection not found' );
                mongoClient.close();
                console.log('database closed');
            }

            collection.findOne( {name : string}, function(err, data){
                var exists = false;

                if (err) {
                    console.log( err );
                }

                if ( data !== null ) {
                    exists = true;
                }

                mongoClient.close();
                console.log('database closed');

                callback( err, exists );
            });
        });
    });
}

exports.save        = save;
exports.nameExists  = nameExists;