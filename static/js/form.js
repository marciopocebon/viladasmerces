function Form(){
	this.html 		= $('#inserir-categoria');
	this.rota 		= this.html.attr('action');
	this.metodo 	= this.html.attr('method');
	this.nameInput 	= this.html.find('#name');
	this.urlInput 	= this.html.find('#url');
	this.dados		= '';
}

Form.prototype.resetarInputs = function(){
	this.nameInput.val('');
	this.urlInput.val('');
};

Form.prototype.bindarEventoSubmit = function( callback ){
	var self = this;
	
	self.html.on('submit', function(e){
		self.dados = self.html.serialize();
		
		Network.ajax( self.metodo, self.rota, self.dados, function( erro, dados ){
			self.resetarInputs();

			callback( erro, dados );
		});	

		e.preventDefault();
		return false;
	});
};

var form = new Form();
form.bindarEventoSubmit(function( erro, dados ){
	if ( erro ) throw Error( erro );

	alert( 'cadastro realizado com sucesso!' );
});