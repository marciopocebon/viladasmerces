function Tabela( container ){
	this.$container 	= $( container );
	this.$header 		= this.$container.find('thead');
	this.$body 			= this.$container.find('tbody');
	this.itens 			= {};
}

Tabela.prototype.addItem = function( itemJson ){
	var item = null;
	
	if ( itemJson instanceof Item ) item = itemJson;
	else item = new Item( itemJson );

	this.$body.prepend( item.$container );
	this.itens[item.ID] = item;
};

Tabela.prototype.addItens = function( itensJson ){
	var self = this;
	var quantidade = itensJson.length;
	var fragment = $(document.createDocumentFragment());

	for ( var i = 0 ; i < quantidade ; i++ ) {
		var item = new Item( itensJson[i] );
		fragment.append( item.$container );
		self.itens[item.ID] = item;
	}

	self.$body.append( fragment );
};

Tabela.prototype.rmItem = function( item ){
	item.$container.remove();
	delete this.itens[item.ID];
};