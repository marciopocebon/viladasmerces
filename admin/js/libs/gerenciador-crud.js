function GerenciadorCrud( config ){
	this.persistencia 	= new Persistencia( config.persistencia );
	this.tabela 		= new Tabela( config.tabela );
	this.formulario		= new Formulario( config.formulario );
}

GerenciadorCrud.prototype.recuperarCategorias = function( callback ){
	var self = this;
	
	self.persistencia.recuperarItens(function( erro, dados ){
		if ( erro ) throw Erro( 'Erro ao recuperar dados: ' + erro );

		callback( dados );
	});
};

GerenciadorCrud.prototype.bindarEventosItens = function(){
	var self = this;
	var itens = self.tabela.itens;

	for ( var i in itens ) {
		var item = itens[i];
		self.bindarEventosItem( item );
	}
};

GerenciadorCrud.prototype.bindarEventosItem = function( item ){
	var self = this;

	self.bindarRemocaoItem( item );
	self.bindarEdicaoItem( item );
};


GerenciadorCrud.prototype.bindarRemocaoItem = function( item ){
	var self = this;

	item.escutarBtnRemover(function( itemClicado ){
		var id = itemClicado.ID;
		var confirmar = confirm( 'deseja realmente remover o item: ' + id);
		if ( !confirmar ) return;

		self.persistencia.removerItem( id, function( erro, itemRemovido ){
			if ( erro || itemRemovido < 1 ) alert('erro ao remover o item: ' + id);
			else self.tabela.rmItem( itemClicado );
		});
	});
};

GerenciadorCrud.prototype.bindarEdicaoItem = function( item ){
	var self = this;

	item.escutarBtnEditar(function( itemClidado ){
		item.escutarBtnSalvar(function( itemClicado ){
			var id = itemClicado.ID;
			var dados = itemClidado.recuperarDados();

			self.persistencia.salvarItem( id, dados, function( erro, status ){
				console.log( erro, status );
			});
		});
	});

};

GerenciadorCrud.prototype.escutarFormulario = function(){
	var self = this;

	self.formulario.escutarSubmit(function( erro, dados ){
		var mensagem = '';

		if ( !erro ) {
			var item = new Item( dados[0], self.tabela.templateItem );
			self.tabela.addItem( item );
			self.bindarEventosItem( item );
			mensagem = 'item adicionado com sucesso';
		} else {
			mensagem = erro;
		}

		alert( mensagem );
	});
};

GerenciadorCrud.prototype.init = function(){
	var self = this;
	
	self.escutarFormulario();

	self.recuperarCategorias(function( categorias ){
		self.tabela.addItens( categorias );
		self.bindarEventosItens();
	});
};