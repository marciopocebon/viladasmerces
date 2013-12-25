/**
 * responsavel por interagir front com o  banco de dados
 */
function Persistencia( colecao ){
	this.colecao = colecao;
}

Persistencia.prototype.recuperarItens = function( callback ){
	var self = this;
	var metodo = 'GET';
	var rota = 'http://app.viladasmerces/rest/'+self.colecao;
	var dados = {};

	Network.ajax( metodo, rota, dados, callback );
};

Persistencia.prototype.recuperarItem = function( id, callback ){
	var self = this;
	var metodo = 'GET';
	var rota = 'http://app.viladasmerces/rest/'+self.colecao+'/'+id;
	var dados = {};

	Network.ajax( metodo, rota, dados, callback );
};

Persistencia.prototype.adicionarItem = function( dados, callback ){
	var self = this;
	var metodo = 'POST';
	var rota = 'http://app.viladasmerces/rest/'+self.colecao;
	var dados = dados;

	Network.ajax( metodo, rota, dados, callback );
};

Persistencia.prototype.atualizarItem = function( id, dados, callback ){
	var self = this;
	var metodo = 'PUT';
	var rota = 'http://app.viladasmerces/rest/'+self.colecao+'/'+id;
	var dados = dados;

	Network.ajax( metodo, rota, dados, callback );
};

Persistencia.prototype.removerItem = function( id, callback ){
	var self = this;
	var metodo = 'DELETE';
	var rota = 'http://app.viladasmerces/rest/'+self.colecao+'/'+id;
	var dados = {};

	Network.ajax( metodo, rota, dados, callback );
};