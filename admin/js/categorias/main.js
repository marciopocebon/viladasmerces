var deps = ['../libs/jquery', '../libs/network', '../libs/persistencia', '../libs/formulario', '../libs/tabela/min/index', 'app'];

requirejs(deps, function(){
	var config = {
		tabela : '#tabela-categorias',
		formulario : '#inserir-categoria',
		persistencia : 'categorias'
	};

	var app = new App( config );
	app.init();
});