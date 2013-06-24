JSP.Pages.main = (function($){

	function MainPage(){ JSP.Page.call(this); }

    MainPage.prototype = Object.create(JSP.Page.prototype);
	MainPage.prototype.constructor = MainPage;

    //Public override

	MainPage.prototype.init = function()
	{
		this.Loader = new JSP.Loader();
		this.id = "main";
		this.initView();

		this.load();
	}

	MainPage.prototype.load = function()
	{

		this.Loader.init.call(this.Loader);

		//data : get from DOM
		var currentModel = JSP.dataManager.find( JSP.routeManager.current );
		currentModel.set("html", JSP.Views.main.$.content.html() );

		//assets
		this.Loader.add.call( this.Loader , JSP.dataManager.primaryAssets );
		this.Loader.add.call( this.Loader , currentModel.assets );

		this.Loader.bind.call(this.Loader, this.Loader.EVENT.ENDED, this.loaded.bind(this) );
		this.Loader.start.call(this.Loader);

	};

	MainPage.prototype.loaded = function()
	{
		this.Loader.unbind.call(this.Loader, this.Loader.EVENT.ENDED, this.loaded.bind(this) );

		//init View of current Page. No need to Load
		JSP.Pages[ JSP.routeManager.current ].init( JSP.routeManager.current );
		JSP.Pages[ JSP.routeManager.current ].initView();

		this.Loader.bind.call(this.Loader, this.Loader.EVENT.HIDDEN, this.hidden.bind(this) );
		this.Loader.hide.call(this.Loader);

	}

	MainPage.prototype.hidden = function()
	{
		JSP.Pages[ JSP.routeManager.current ].bind( JSP.Pages[ JSP.routeManager.current ].EVENT.SHOWN, this.viewShown );
		JSP.Pages[ JSP.routeManager.current ].show();
	}

	MainPage.prototype.viewShown = function()
	{
		console.log("Main page displayed !");
	}

	return new MainPage();

})(jQuery);




