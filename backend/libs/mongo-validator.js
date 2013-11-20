/**
 * @object [responsavel por disponibilizar metodos para validar queries de operacoes CRUD]
 */
function MongoJSValidator(){}

MongoJSValidator.isSchemaValid = function( jsonQuery, schemaCollection ){
    /*
    ** Verifica se as keys passadas na query fazem parte do schema da collection
    ** @param   {Object}    : query
    ** @param   {Object}    : schema
    ** @return  {Boolean}   : o schema é valido?
    */
   
    var query   = jsonQuery;
    var schema  = schemaCollection;

    for( var key in query ){
        if ( typeof schema[ key ] === 'undefined' ) return false;
    }

    return true;
};

MongoJSValidator.isSchemaComplete = function( jsonQuery, schemaCollection ){
    /*
    ** Verifica se a query contem a mesma quantidade de campos que o schema da collection
    ** @param {Object}      : query
    ** @param {Object}      : schema
    ** @return {Boolean}    : a query possui todos os campos do schema?
    */

    var query        = jsonQuery;
    var schema       = schemaCollection;
    var queryLength  = Object.keys( query ).length;
    var schemaLength = Object.keys( schema ).length;

    if ( queryLength !== schemaLength ) return false;

    return true;
};

MongoJSValidator.queryHasPrimaryKey = function( jsonQuery, primaryKeyCollection ){
    /*
    ** Verifica se a primary key consta na query
    ** @param {Object}      : query
    ** @param {String}      : nome da primary da collection
    ** @return {Boolean}    : a query cotem a primary key?
    */

    var query       = jsonQuery;
    var primaryKey  = primaryKeyCollection;

    if ( typeof query[ primaryKey ] !== 'undefined' ) return true;

    return false;
};

MongoJSValidator.isQueryValid = function( jsonQuery, schemaCollection, primaryKeyCollection ) {
    /*
    ** Valida uma query
    ** @param {Object} : query
    ** @param {Object} : schema da collection
    ** @param {String} : nome da primary da collection
    ** @return {Boolean} : a query é valida?
    */

    var query               = jsonQuery;
    var schema              = schemaCollection;
    var primaryKey          = primaryKeyCollection;
    var isSchemaValid       = false;
    var isSchemaComplete    = false;
    var queryHasPrimaryKey  = false;

    // valida a query
    isSchemaValid       = MongoJSValidator.isSchemaValid( query, schema );
    isSchemaComplete    = MongoJSValidator.isSchemaComplete( query, schema );
    queryHasPrimaryKey  = MongoJSValidator.queryHasPrimaryKey( query, primaryKey );

    if ( !isSchemaValid || !isSchemaComplete || !queryHasPrimaryKey ){
        return false;
    }

    return true;
};

exports.MongoJSValidator = MongoJSValidator;