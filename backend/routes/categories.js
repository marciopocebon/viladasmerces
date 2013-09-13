var MongoJSCategory = require('../libs/src/mongo-categories').MongoJSCategory;

exports.list = function( req, res ){
	console.log( req.params );
	res.send( 's' );
	// var obj = new MongoJSCategory();
	// obj.list(function( data ){
	// 	res.send( data );
	// });
};
