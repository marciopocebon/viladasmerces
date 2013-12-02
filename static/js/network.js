function Network(){}

Network.ajax = function( metodo, rota, dados, callback ){
	$.ajax({
		url 	: rota,
		type 	: metodo,
		data 	: dados,
		success : function( dados ){
			callback( null, dados );
		},
		error 	: function( erro ){
			callback( erro, null );
		}
	});
};