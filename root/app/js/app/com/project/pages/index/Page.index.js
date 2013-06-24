JSP.Pages.index = (function($){

	function IndexPage(){ JSP.Page.call(this); }

    IndexPage.prototype = Object.create(JSP.Page.prototype);
	IndexPage.prototype.constructor = IndexPage;

    //Public override

	return new IndexPage();

})(jQuery);




