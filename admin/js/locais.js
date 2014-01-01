var deps = ['libs/jquery', 'libs/network', 'libs/persistencia', 'libs/formulario', 'libs/tabela/min/index', 'libs/gerenciador-crud'];

requirejs(deps, function(){
	var config = {
		tabela : {
			container : 'table',
			campos 	  : ["nome", "url", "endereco", "bairro", "telefone", "imagem", "categoria"]
		},
		formulario : 'form',
		persistencia : 'locais'
	};

	var app = new GerenciadorCrud( config );
	app.init();
});