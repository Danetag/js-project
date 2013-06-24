JSP.Pages.about = (function($){

	function AboutPage(){ JSP.Page.call(this); }

    AboutPage.prototype = Object.create(JSP.Page.prototype);
	AboutPage.prototype.constructor = AboutPage;

    //Public override

	return new AboutPage();

})(jQuery);




