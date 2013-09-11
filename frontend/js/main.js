require(["jquery"], function($) {
	function setMenuWidth(){
		var menu 		= $('.header-nav-items');
		var items 		= menu.find('.header-nav-link');
		var length 		= items.length;
		var width 		= (988 / length);

		items.css('width', width);
	}

	$(document).ready(function(){
		setMenuWidth();
	});
});
