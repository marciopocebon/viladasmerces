/**
 * responsavel por interagir front com o  banco de dados
 */
function Persistencia( colecao ){
	this.colecao 	= colecao;
	this.rota 		= 'http://app.viladasmerces/rest/';
}

Persistencia.prototype.recuperarItens = function( callback ){
	var self = this;
	var metodo = 'GET';
	var rota = self.rota+self.colecao;
	var dados = {};

	Network.ajax( metodo, rota, dados, callback );
};

Persistencia.prototype.recuperarItem = function( id, callback ){
	var self = this;
	var metodo = 'GET';
	var rota = self.rota+self.colecao+'/'+id;
	var dados = {};

	Network.ajax( metodo, rota, dados, callback );
};

Persistencia.prototype.adicionarItem = function( dados, callback ){
	var self = this;
	var metodo = 'POST';
	var rota = self.rota+self.colecao;
	var dados = dados;

	Network.ajax( metodo, rota, dados, callback );
};

Persistencia.prototype.salvarItem = function( id, dados, callback ){
	var self = this;
	var metodo = 'PUT';
	var rota = self.rota+self.colecao+'/'+id;
	var dados = dados;

	Network.ajax( metodo, rota, dados, callback );
};

Persistencia.prototype.removerItem = function( id, callback ){
	var self = this;
	var metodo = 'DELETE';
	var rota = self.rota+self.colecao+'/'+id;
	var dados = {};

	Network.ajax( metodo, rota, dados, callback );
};