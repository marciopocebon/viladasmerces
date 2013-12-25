function App( config ){
	this.persistencia 	= new Persistencia( config.persistencia );
	this.tabela 		= new Tabela( config.tabela );
	this.formulario		= new Formulario( config.formulario );
}

App.prototype.recuperarCategorias = function( callback ){
	var self = this;
	
	self.persistencia.recuperarItens(function( erro, dados ){
		if ( erro ) throw Erro( 'Erro ao recuperar categorias: ' + erro );

		callback( dados );
	});
};

App.prototype.bindarRemocaoItens = function(){
	var self = this;
	var itens = self.tabela.itens;

	for ( var i in itens ) {
		var item = itens[i];
		self.bindarRemocaoItem( item );
	}
};

App.prototype.bindarRemocaoItem = function( item ){
	var self = this;

	item.escutarBtnRemover(function( itemClicado ){
		var nome = itemClicado.$container.find('.nome').text();
		var confirmar = confirm( 'deseja realmente remover a categoria: ' + nome);
		if ( !confirmar ) return;

		self.persistencia.removerItem( nome, function( erro, status ){
			if ( erro ) alert('erro ao remover a categoria: ' + erro);
			else self.tabela.rmItem( itemClicado );
		});
	});
};

App.prototype.escutarFormulario = function(){
	var self = this;

	self.formulario.escutarSubmit(function( erro, dados ){
		var mensagem = '';

		if ( !erro ) {
			var item = new Item( dados[0] );
			self.tabela.addItem( item );
			self.bindarRemocaoItem( item );
			mensagem = 'categoria adicionada com sucesso';
		} else {
			mensagem = erro;
		}

		alert( mensagem );
	});
};

App.prototype.init = function(){
	var self = this;
	
	self.escutarFormulario();

	self.recuperarCategorias(function( categorias ){
		self.tabela.addItens( categorias );
		self.bindarRemocaoItens();
	});
};