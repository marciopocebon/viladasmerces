exports.start = function(){
	var express 	= require('express');
	var app			= express();
	var root 		= require('./root');
	var crud 		= require('./crud');
	const PORT 		= process.env.PORT || 8080;

	// necessario parsear o body para acessar seus dados
	app.use(express.bodyParser());

	// root
	// app.get('/', root.index);

	// rotas de CRUD
	// retorna todos items cadastrados
	app.get('/:collection', crud.findAll);
	// cria um novo item
	app.post('/:collection', crud.insert);
	// retorna um unico item
	app.get( '/:collection/:id', crud.findOne);
	// deleta um item
	app.delete('/:collection/:id', crud.remove);
	// atualiza um item
	app.put( '/:collection/:id', crud.findAndModify);

	// inicia o servidor
	app.listen(PORT, function(){
		console.log('server has started on port:'+PORT);
	});
};
