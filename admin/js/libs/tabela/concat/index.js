function Item( json ){
	this.$container 	= $(Item.RENDERIZAR( json, Item.TEMPLATE ));
	this.$gerenciador 	= this.$container.find('.gerenciador');
	this.$btnEditar		= this.$gerenciador.find('.editar');
	this.$btnRemover	= this.$gerenciador.find('.remover');
	this.ID 			= this.$container.attr('id');
}

Item.TEMPLATE = '\
	<tr class="item" id="{_id}">\
		<th class="nome">{name}</th>\
		<th class="url">{url}</th>\
		<th class="gerenciador">\
			<button class="btn btn-primary btn-xs editar">editar</button>\
			<button class="btn btn-danger btn-xs remover">remover</button>\
		</th>\
	</tr>';

Item.RENDERIZAR = function( json, html ){

    for (var key in json) {
        var regularExpression = new RegExp('\{'+key+'\}', 'ig');
        var content = json[key];

        html = html.replace(regularExpression, content);
    }

    return html;
};

Item.prototype.escutarBtnEditar = function( callback ){
	var self = this;
	
	self.$btnEditar.on('click', function(){
		callback( self );
	});
};

Item.prototype.escutarBtnRemover = function( callback ){
	var self = this;
	
	self.$btnRemover.on('click', function(){
		callback( self );
	});
};function Tabela( container ){
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