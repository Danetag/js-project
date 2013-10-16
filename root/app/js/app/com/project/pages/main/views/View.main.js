JSP.Views.main = (function($){

	function MainView(){ JSP.View.call(this); }

    MainView.prototype = Object.create(JSP.View.prototype);
	MainView.prototype.constructor = MainView;

    //Public override

	MainView.prototype.el = function()
	{
		this.$ = 
		{
			body    : null,
			content : null,
			header  : {
				a : null
			}
		};

		this.$.header.a = $("#header a");
		this.$.body     = $("body");
		this.$.content  = $("#content");

		this.bindEvents();
	}

	MainView.prototype.bindEvents = function()
	{
		this.$.header.a.on("click", function(e){

			e.preventDefault();

			History.pushState(null, null, $(this).attr("href") );

		} );
	}

	MainView.prototype.unbindEvents = function()
	{
		this.$.header.a.off("click" );
	}


	return new MainView();	

})(jQuery);




