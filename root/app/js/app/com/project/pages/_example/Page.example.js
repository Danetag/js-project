JSP.Pages.example = (function($){

	function ExamplePage(){ JSP.Page.call(this); }

    ExamplePage.prototype = Object.create(JSP.Page.prototype);
	ExamplePage.prototype.constructor = ExamplePage;

    //Public override

	return new ExamplePage();

})(jQuery);




