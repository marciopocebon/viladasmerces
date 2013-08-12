function Form( container ){
	this.container 			= $( container );
	this.submitBtn			= this.container.find('#submit-btn');
	this.nameInput 			= this.container.find('#category-name');
	this.descriptionInput 	= this.container.find('#category-description');
	this.imageInput 		= this.container.find('#category-image');

	this.callbackContainer = $( '.callback-container' );
	this.callbackMessages = {
		success : 'Category added successfully',
		error 	: 'Error. Check out node.js logs.'
	};

	// previni o POST default
	this.container.submit(function( e ){
		e.preventDefault();
		return false;
	});
}

Form.prototype.sendCallbackMessage = function( jsonMessage ){
	/*
	** Imprime na tela uma mensagem de feedback de acordo com response do server após um POST
	** @param {Object} : json contendo a mensagem de retorno
	*/

	var json 			= jsonMessage;
	var messageValue 	= json.value;

	if ( messageValue ) {
		this.callbackContainer.text( this.callbackMessages.success );
	} else {
		this.callbackContainer.text( this.callbackMessages.error );
	}
};

Form.prototype.getFormData = function(){
	/*
	** Coleta os dados preenchidos no form e retorna como objeto
	** @return {Object} : objeto contendo dados do form
	*/

	var self 			= this;
	
	// coleta os dados do form
	var nameData 		= this.nameInput.val();
	var descriptionData = this.descriptionInput.val();
	var imageData 		= this.imageInput.val();

	// monta a estrutura de obj
	var data = {
		name 		: nameData,
		description : descriptionData,
		image 		: imageData
	};

	return data;
};

Form.prototype.resetFormData = function(){
	/*
	** Reseta todos os campos do form
	*/

	this.nameInput.val('');
	this.descriptionInput.val('');
	this.imageInput.val('');
}

Form.prototype.validateFormdata = function( jsonData ){
	/*
	** Valida os dados vindos do formulario
	** @param {Object} 		: objeto com dados vindo do formulario
	** @return {Boolean} 	: dados validos ou nao
	*/

	var self 		= this;
	var data 		= jsonData;
	var isDataValid = true;

	if ( typeof data 				=== 'undefined' ) isDataValid = false;
	if ( typeof data.name 			=== 'undefined' || data.name 		=== '' ) isDataValid = false;
	if ( typeof data.description 	=== 'undefined' || data.description === '' ) isDataValid = false;
	if ( typeof data.image 			=== 'undefined' || data.image 		=== '' ) isDataValid = false;

	return isDataValid;
};

Form.prototype.sendFormData = function( jsonData ){
	/*
	** Envia os dados do formulario para o servidor
	** @param {Object} 		: dados no formato json
	** @return {Boolean} 	: dados enviados com sucesso ou nao
	*/

	var self 			= this;
	var jsonData 		= jsonData;
	var requestURL 		= 'add-cat-node';
	var callbackMessage = null;

	$.ajax({
		type 	: 'POST',
		url 	: requestURL,
		data 	: jsonData,
		async 	: false,
		success : function( response ){
			callbackMessage = response;
		},
		error 	: function( err ){
			callbackMessage = err;
		}
	});

	this.sendCallbackMessage( callbackMessage );
};

Form.prototype.listen = function(){
	/*
	** Inicia a app
	*/

	var self 		= this;
	var data 		= null;
	var isDataValid = null;

	this.submitBtn.click(function(){
		data 		= self.getFormData();
		isDataValid = self.validateFormdata( data );

		if ( isDataValid ) {
			self.sendFormData( data );
			self.resetFormData();
		}
	});
};

$(document).ready(function(){
	var form = new Form( '.form-add-cat' );
	form.listen();
});