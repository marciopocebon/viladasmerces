var form = new Form();
form.bindarEventoSubmit(function( erro, dados ){
	if ( erro ) throw Error( erro );

	alert( 'cadastro realizado com sucesso!' );
});