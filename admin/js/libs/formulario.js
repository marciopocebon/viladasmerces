function Formulario( container ){
	this.$container = $( container );
	this.$inputs 	= this.$container.find('input');
	this.$btnSubmit = this.$container.find('.submit');
	this.rota 		= this.$container.attr('action');
	this.metodo 	= this.$container.attr('method');
}

Formulario.prototype.resetarInputs = function(){
	var self = this;
	var quantidade = self.$inputs.length;

	for( var i = 0 ; i < quantidade ; i++ ){
		var $input = $(self.$inputs[i]);
		$input.val('');
	}
};

Formulario.prototype.resetar = function(){
	this.resetarInputs();
};

Formulario.prototype.escutarSubmit = function( callback ){
	var self = this;
	var dadosSerializados = null;
	
	self.$container.on('submit', function(e){
		e.preventDefault();
		dadosSerializados = self.$container.serialize();

		Network.ajax( self.metodo, self.rota, dadosSerializados, function( erro, dados ){
			self.resetar();

			if ( dados && dados.err ) {
				erro = dados.err;
				dados = null;
			}

			callback( erro, dados );
		});
	});
};