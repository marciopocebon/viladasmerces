var deps = ['libs/jquery', 'libs/helper', 'libs/network', 'libs/persistencia', 'libs/formulario', 'libs/formulario-select','libs/tabela/min/index', 'libs/gerenciador-crud'];

requirejs(deps, function(){
	const CONFIG = {
		tabela : {
			container : 'table',
			campos 	  : ["nome", "url", "telefone", "categoria"]
		},
		formulario : 'form',
		persistencia : 'locais',
		select : 'select'
	};

	var app = new GerenciadorCrud( CONFIG );
	var persistenciaCategorias = new Persistencia( 'categorias' );
	var selectCategorias = new FormularioSelect(CONFIG.select);

	// carregamento inicial dos dados
	app.init(function(){
		// carrega as categorias que serao utilizadas no formulario
		persistenciaCategorias.recuperarItens(function( erro, dados ){
			if ( erro ) throw Erro( 'Erro ao recuperar dados: ' + erro );

			selectCategorias.carregar( dados );
		});
	});
});