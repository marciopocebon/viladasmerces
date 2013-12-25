function App( config ){
	this.persistencia 	= new Persistencia( config.persistencia );
	this.tabela 		= new Tabela( config.tabela );
	this.formulario		= new Formulario( config.formulario );
}

App.prototype.escutarEventos = function(){
	var self = this;

	self.formulario.escutarSubmit(function( erro, dados ){
		// vira um array do banco
		var dados = dados[0];
		var mensagem = '';
		
		if ( !erro ) {
			self.tabela.addItem( dados );
			mensagem = 'categoria adicionada com sucesso';
		} else {
			mensagem = erro;
		}

		alert( mensagem );
	});
};

App.prototype.init = function(){
	var self = this;
	
	self.escutarEventos();
	
	self.persistencia.recuperarItens(function( erro, dados ){
		if ( erro ) {
			self.tabela.$container.append(erro);
		} else {
			self.tabela.addItens( dados );
		}
	});
};