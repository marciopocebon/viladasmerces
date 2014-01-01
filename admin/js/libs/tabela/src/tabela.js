function Tabela( config ){
	this.campos 		= config.campos;
	this.$container 	= $( config.container );
	this.$header 		= this.$container.find('thead tr');
	this.$body 			= this.$container.find('tbody');
	this.itens 			= {};
	
	this.templateItem 	= this.gerarTemplateItem();
	this.gerarHeader();
}

Tabela.prototype.gerarTemplateItem = function(){
	var self = this;
	var quantidade = self.campos.length;
	var template = '<tr class="item" id="{_id}">';
	var fimTemplate = '</tr>';
	var thGerenciar = '
		<th class="gerenciador">\
			<button class="btn btn-success btn-xs salvar disabled">salvar</button>\
			<button class="btn btn-primary btn-xs editar">editar</button>\
			<button class="btn btn-danger btn-xs remover">remover</button>\
		</th>';

	for ( var i = 0 ; i < quantidade ; i++ ) {
		var campo = self.campos[i];
		var th = '<th class="'+campo+' dado">{'+campo+'}</th>';
		template+=th;
	}

	template+=thGerenciar;
	template+=fimTemplate;
	return template;
};

Tabela.prototype.gerarHeader = function(){
	var self = this;
	var quantidade = self.campos.length;
	var $fragment = $(document.createDocumentFragment());

	for ( var i = 0 ; i < quantidade ; i++ ) {
		var campo = self.campos[i];
		var itemHeader = $('<th>'+campo+'</th>');
		$fragment.append(itemHeader);
	}

	$fragment.append('<th>gerenciar<th>');
	self.$header.append($fragment);
};

Tabela.prototype.addItem = function( itemJson ){
	var item = null;
	
	if ( itemJson instanceof Item ) item = itemJson;
	else item = new Item( itemJson, this.templateItem );

	this.$body.prepend( item.$container );
	this.itens[item.ID] = item;
};

Tabela.prototype.addItens = function( itensJson ){
	var self = this;
	var quantidade = itensJson.length;
	var fragment = $(document.createDocumentFragment());

	for ( var i = 0 ; i < quantidade ; i++ ) {
		var item = new Item( itensJson[i], self.templateItem );
		fragment.append( item.$container );
		self.itens[item.ID] = item;
	}

	self.$body.append( fragment );
};

Tabela.prototype.rmItem = function( item ){
	item.$container.remove();
	delete this.itens[item.ID];
};