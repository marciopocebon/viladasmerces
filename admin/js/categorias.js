var deps = ['libs/jquery', 'libs/network', 'libs/persistencia', 'libs/formulario', 'libs/tabela/min/index', 'libs/gerenciador-crud'];

requirejs(deps, function(){
	var config = {
		tabela : {
			container : 'table',
			campos 	  : ["nome", "url"]
		},
		formulario : 'form',
		persistencia : 'categorias'
	};

	var app = new GerenciadorCrud( config );
	app.init();
});