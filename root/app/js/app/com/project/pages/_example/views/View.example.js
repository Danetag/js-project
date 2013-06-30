JSP.Views.example = (function($){

	function ExampleView(){ JSP.View.call(this); }

    ExampleView.prototype = Object.create(JSP.View.prototype);
	ExampleView.prototype.constructor = ExampleView;

    //Public override


	ExampleView.prototype.el = function()
	{
		
	}

	ExampleView.prototype.bindEvents = function()
	{
		
	}

	ExampleView.prototype.unbindEvents = function()
	{
		
	}


	return new ExampleView();	

})(jQuery);




