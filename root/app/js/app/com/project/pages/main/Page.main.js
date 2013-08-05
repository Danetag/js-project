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
		var currentModel = JSP.dataManager.find( JSP.routeManager.current.id, JSP.routeManager.current.name );
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

		var currentPage = JSP.Pages[ JSP.routeManager.current.id ];

		//init View of current Page. No need to Load
		currentPage.init( JSP.routeManager.current.id, JSP.routeManager.current.name );
		currentPage.initView();

		this.Loader.bind.call(this.Loader, this.Loader.EVENT.HIDDEN, this.hidden.bind(this) );
		this.Loader.hide.call(this.Loader);

	}

	MainPage.prototype.hidden = function()
	{
		this.Loader.unbind.call(this.Loader, this.Loader.EVENT.HIDDEN, this.hidden.bind(this) );
		this.Loader.destroy.call(this.Loader);
		this.Loader = null;

		JSP.Pages[ JSP.routeManager.current.id ].bind( JSP.Pages[ JSP.routeManager.current.id ].EVENT.SHOWN, this.viewShown.bind(this) );
		JSP.Pages[ JSP.routeManager.current.id ].show();
	}

	MainPage.prototype.viewShown = function()
	{
		console.log("Main page displayed !");
		
	}

	return new MainPage();

})(jQuery);