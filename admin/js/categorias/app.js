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

App.prototype.bindarEventosItens = function(){
	var self = this;
	var itens = self.tabela.itens;

	for ( var i in itens ) {
		var item = itens[i];
		self.bindarEventosItem( item );
	}
};

App.prototype.bindarEventosItem = function( item ){
	var self = this;

	self.bindarRemocaoItem( item );
	self.bindarEdicaoItem( item );
};


App.prototype.bindarRemocaoItem = function( item ){
	var self = this;

	item.escutarBtnRemover(function( itemClicado ){
		var id = itemClicado.$container.attr('id');
		var confirmar = confirm( 'deseja realmente remover a categoria: ' + id);
		if ( !confirmar ) return;

		self.persistencia.removerItem( id, function( erro, itemRemovido ){
			if ( erro || itemRemovido < 1 ) alert('erro ao remover a categoria: ' + id);
			else self.tabela.rmItem( itemClicado );
		});
	});
};

App.prototype.bindarEdicaoItem = function( item ){
	var self = this;

	item.escutarBtnEditar(function( itemClidado ){
		item.escutarBtnSalvar(function( itemClicado ){
			var id = itemClicado.$container.attr('id');
			var dados = itemClidado.recuperarDados();

			self.persistencia.salvarItem( id, dados, function( erro, status ){
				console.log( erro, status );
			});
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
			self.bindarEventosItem( item );
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
		self.bindarEventosItens();
	});
};