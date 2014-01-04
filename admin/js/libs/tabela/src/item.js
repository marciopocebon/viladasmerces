function Item( json, template ){
	this.$container 	= $(Helper.renderizar( json, template ));
	this.$gerenciador 	= this.$container.find('.gerenciador');
	this.$btnEditar		= this.$gerenciador.find('.editar');
	this.$btnRemover	= this.$gerenciador.find('.remover');
	this.$btnSalvar		= this.$gerenciador.find('.salvar');
	this.ID 			= this.$container.attr('id');
}

// TODO
// recuperar dados de forma dinamica
// como nao sabemos quantos campos existirao
// devera recuperar dados de todos os campos existentes e retornar um json
Item.prototype.recuperarDados = function(){
	var nome = this.$container.find('.nome').text();
	var url = this.$container.find('.url').text();
	return { nome : nome, url : url };
};

Item.prototype.disableBtn = function( $el ){
	$el.addClass('disabled');
};

Item.prototype.enableBtn = function( $el ){
	$el.removeClass('disabled');
};

Item.prototype.isBtnDisabled = function( $el ){
	return $el.hasClass( 'disabled' );
};

Item.prototype.disableContentEditable = function(){
	var self = this;
	var $dados = self.$container.find('.dado');
	var quantidade = $dados.length;

	for ( var i = 0 ; i < quantidade ; i++ ) {
		var $dado = $($dados[i]);

		$dado.attr('contenteditable', 'false');
	}
};

Item.prototype.enableContentEditable = function(){
	var self = this;
	var $dados = self.$container.find('.dado');
	var quantidade = $dados.length;

	for ( var i = 0 ; i < quantidade ; i++ ) {
		var $dado = $($dados[i]);

		$dado.attr('contenteditable', 'true');
	}
};

Item.prototype.escutarBtnEditar = function( callback ){
	var self = this;
	
	self.$btnEditar.on('click', function(){
		var isBtnSalvarDisabled = self.isBtnDisabled( self.$btnSalvar );
		
		if ( isBtnSalvarDisabled ) {
			self.enableContentEditable();
			self.disableBtn( self.$btnEditar );
			self.disableBtn( self.$btnRemover );
			self.enableBtn( self.$btnSalvar );
			callback( self );
		}
	});
};

Item.prototype.escutarBtnSalvar = function( callback ){
	var self = this;

	self.$btnSalvar.on('click', function(){
		var isBtnEditarDisabled = self.isBtnDisabled( self.$btnEditar );

		if ( isBtnEditarDisabled ) {
			self.disableContentEditable();
			self.disableBtn( self.$btnSalvar );
			self.enableBtn( self.$btnEditar );
			self.enableBtn( self.$btnRemover );
			callback( self );
		}
	});
};

Item.prototype.escutarBtnRemover = function( callback ){
	var self = this;
	
	self.$btnRemover.on('click', function(){
		var isBtnSalvarDisabled = self.isBtnDisabled( self.$btnSalvar );
		if ( isBtnSalvarDisabled ) callback( self );
	});
};