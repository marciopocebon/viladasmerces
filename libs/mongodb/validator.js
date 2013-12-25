/**
 * @class [responsavel por disponibilizar metodos para validar queries de operacoes CRUD]
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

MongoJSValidator.isQueryValid = function( jsonQuery, schemaCollection ) {
    /*
    ** Valida uma query
    ** @param {Object} : query
    ** @param {Object} : schema da collection
    ** @return {Boolean} : a query é valida?
    */

    var query               = jsonQuery;
    var schema              = schemaCollection;
    var isSchemaValid       = false;
    var isSchemaComplete    = false;
    var queryHasLength      = false;

    // valida a query
    isSchemaValid       = MongoJSValidator.isSchemaValid( query, schema );
    isSchemaComplete    = MongoJSValidator.isSchemaComplete( query, schema );
    queryHasLength      = MongoJSValidator.queryHasLength( query);

    if ( !isSchemaValid || !isSchemaComplete || !queryHasLength ){
        return false;
    }

    return true;
};

/**
 * Verifica se todos os parametros da query possuem mais de 0 caracteres
 * @param  {Object<json>} jsonQuery [query]
 * @return {Boolean}
 */
MongoJSValidator.queryHasLength = function( jsonQuery ){
    for ( var parametro in jsonQuery ) {
        if ( parametro.length < 1 ) return false;
    }

    return true;
};

exports.MongoJSValidator = MongoJSValidator;