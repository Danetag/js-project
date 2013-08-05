JSP.Views.index = (function($){

	function IndexView(){ JSP.View.call(this); }

    IndexView.prototype = Object.create(JSP.View.prototype);
	IndexView.prototype.constructor = IndexView;

    //Public override

	IndexView.prototype.bindEvents = function()
	{
		
	}

	IndexView.prototype.unbindEvents = function()
	{
		
	}


	return new IndexView();	

})(jQuery);




