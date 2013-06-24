JSP.Views.main = (function($){

	function MainView(){ JSP.View.call(this); }

    MainView.prototype = Object.create(JSP.View.prototype);
	MainView.prototype.constructor = MainView;

    //Public override

	MainView.prototype.$ = 
	{
		body    : null,
		content : null,
		header  : {
			a : null
		}
	};

	MainView.prototype.el = function()
	{
		this.$.header.a = $("#header a");
		this.$.body     = $("body");
		this.$.content  = $("#content");
	}

	MainView.prototype.bindEvents = function()
	{
		this.$.header.a.on("click", _clicked );
	}

	MainView.prototype.unbindEvents = function()
	{
		this.$.header.a.off("click", _clicked );
	}

	_clicked = function(e)
	{
		e.preventDefault();

		History.pushState(null, null, $(this).attr("href") );
	};


	return new MainView();	

})(jQuery);




