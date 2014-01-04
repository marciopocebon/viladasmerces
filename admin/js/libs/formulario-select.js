function FormularioSelect( container ){
	this.$container = $(container);
}

FormularioSelect.TEMPLATE = '<option value="{_id}">{nome}</option>';

FormularioSelect.prototype.carregar = function( dados ){
	var self = this;
	var quantidade = dados.length;
	var $fragment = $(document.createDocumentFragment());

	for ( var i = 0 ; i < quantidade ; i++ ) {
		var itemDados = dados[i];
		var $itemRenderizado = $(Helper.renderizar( itemDados, FormularioSelect.TEMPLATE ));

		$fragment.append( $itemRenderizado );
	}

	self.$container.append($fragment);
};