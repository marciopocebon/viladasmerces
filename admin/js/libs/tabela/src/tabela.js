function Tabela( container ){
	this.$container 	= $( container );
	this.$header 		= this.$container.find('thead');
	this.$body 			= this.$container.find('tbody');
}

Tabela.prototype.addItem = function( jsonItem ){
	var item = new Item( jsonItem );
	this.$body.prepend( item.$container );
};

Tabela.prototype.addItens = function( jsonItens ){
	var self = this;
	var length = jsonItens.length;
	var fragment = $(document.createDocumentFragment());

	for ( var i = 0 ; i < length ; i++ ) {
		var jsonItem = jsonItens[i];
		var item = new Item( jsonItem );

		item.escutarBtnRemover(function( itemClicado ){
			self.removerItem( itemClicado, function( idItemRemovido ){
				console.log( idItemRemovido );
			});
		});
		
		fragment.append( item.$container );
	}

	this.$container.append( fragment );
};

Tabela.prototype.removerItem = function( item, callback ){
	item.$container.remove();
	callback( item.ID );
};