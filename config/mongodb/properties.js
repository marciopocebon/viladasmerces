var MONGO_PROPERTIES = {
	host : 'localhost',
	port : 27017,
	database : 'merces',
	collections : {
		categorias : {
			nome : 'categorias',
			schema : {
				nome 		: true,
				url 		: true
			}
		},
		locais : {
			nome : 'locais',
			schema : {
				nome 			: true,
				url 			: true,
				endereco 		: true,
				bairro 			: true,
				telefone 		: true,
				imagem 			: true,
				categoria 		: true
			}
		},
		usuarios : {
			username 	: true,
			email 		: true
		}
	}
};

exports.MONGO_PROPERTIES = MONGO_PROPERTIES;