var MongoJS = require('../libs/mongo').MongoJS;

exports.index = function(req,res){
	var a 			= new MongoJS( 'merces' );
	var collection 	= 'category';

	var newData = {
		name 	: 'pizzarias',
		phone 	: '(11) 1111-2222',
		image 	: 'http://www.aaerd.com.br/titulo.jpg'
	}

	// a.insert( newData, collection, function( success ){
	// 	console.log( 'success -> ', success );
	// 	res.send( 'opa!' );
	// });

	a.remove( newData, collection, function( success ){
		console.log( 'success -> ', success );
		res.send( 'opa!' );
	});
};