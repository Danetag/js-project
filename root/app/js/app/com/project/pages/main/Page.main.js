JSP.Pages = JSP.Pages || {};

JSP.Pages.main = (function($){

	function MainPage(){ JSP.Page.call(this); }

    MainPage.prototype = Object.create(JSP.Page.prototype);
	MainPage.prototype.constructor = MainPage;

    //Public override

	MainPage.prototype.init = function()
	{
		this.id   = "main";
		this.name = "main";

		var currentPage  = JSP.Pages[ JSP.routeManager.current.id ];
		var urlDirecable = ( JSP.routeManager.current.jSVar.urlDirectable != undefined ) ? JSP.routeManager.current.jSVar.urlDirectable : true;
		this.hasLoading  = ( JSP.routeManager.current.jSVar.hasLoading != undefined ) ? JSP.routeManager.current.jSVar.hasLoading : true;

		/// REDIRECT MAIN

		//TODO : redo
		
		/*
		
		if( urlDirecable && !JSP.routeManager.current.jSVar.urlDirectable )
		{
			var redirectPageID =  JSP.routeManager.current.jSVar.redirect;
			var url            = JSP.routeManager.getRoute( redirectPageID, JSP.conf.lang )
			
			window.location    = JSP.conf.baseUrl + url;
		}
		*/
		
		//////////////////
		
		////JSP.console.log("init current page :: "+ JSP.routeManager.current.id )

		currentPage.init({ 
			id 			: JSP.routeManager.current.id, 
			name 		: JSP.routeManager.current.name,
			jSVar 	    : JSP.routeManager.current.jSVar,
			bodyClass 	: JSP.routeManager.current.bodyClass
		});

		this.initView();

		if( this.hasLoading )
		{
			this.Loader            = new JSP.Loader();
			this.Loader.loaderView = new JSP.LoaderViews.Main(); //Main Loader View

			this.load();
		}	
		else
		{
			//if( JSP.conf.hasPushState ) 
			var currentModel = JSP.dataManager.find( JSP.routeManager.current.id, JSP.routeManager.current.name );
			currentModel.set("html", JSP.Views.main.$.content.html() );

			this.initCurrentView();
		}	
	}

	MainPage.prototype.load = function()
	{
		this.Loader.init.call(this.Loader);

		var currentPage = JSP.Pages[ JSP.routeManager.current.id ];

		currentPage.Loader = this.Loader; //give it to reference. Don't forget to delete it after use!

		//data : get from DOM 
		var currentModel = JSP.dataManager.find( JSP.routeManager.current.id, JSP.routeManager.current.name );

		//if support pushState, save the HTML string
		if( JSP.conf.hasPushState ) 
			currentModel.set("html", JSP.Views.main.$.content.html() );
		else
		{
			this.id = JSP.routeManager.current.id; //temp
			this.Model = currentModel;
			this.addDataToLoad();
		}	

		//assets
		this.Loader.add.call( this.Loader , JSP.dataManager.primaryAssets );
		this.Loader.add.call( this.Loader , currentModel.assets );
		this.Loader.add.call( this.Loader , currentPage.assets );

		this.Loader.bind.call(this.Loader, this.Loader.EVENT.ENDED, this.loaded.bind(this) );
		this.Loader.start.call(this.Loader);

	};

	MainPage.prototype.loaded = function()
	{
		this.Loader.unbind.call(this.Loader, this.Loader.EVENT.ENDED, this.loaded.bind(this) );

		var currentPage = JSP.Pages[ JSP.routeManager.current.id ];

		if( !JSP.conf.hasPushState ) 
		{
			//var currentModel = JSP.dataManager.find( JSP.routeManager.current.id, JSP.routeManager.current.name );

			var html = $( this.Loader.getData("html_" + this.id , true) ).find("root").text();
			this.Model.set("html", html);
		}

		//SOUND
		this.initSound();

		//Load extras from currentPage
		currentPage.bind( currentPage.EVENT.EXTRAS_LOADED, this.onCurrentExtrasLoaded.bind(this) )
		currentPage.loadExtras();		

	}

	MainPage.prototype.initSound = function()
    {
    	if( !JSP.conf.hasAudio )
    		return;
    	
    	//SOUND
		//JSP.SoundManager.add("loop", { loop:-1 } );
    }

	MainPage.prototype.onCurrentExtrasLoaded = function()
	{
		var currentPage = JSP.Pages[ JSP.routeManager.current.id ];

		currentPage.unbind( currentPage.EVENT.EXTRAS_LOADED, this.onCurrentExtrasLoaded.bind(this) )

		this.initCurrentView();
		
	}

	MainPage.prototype.initCurrentView = function()
	{
		var currentPage = JSP.Pages[ JSP.routeManager.current.id ];

		//init View of current Page. No need to Load
		currentPage.bind( currentPage.EVENT.VIEW_INIT, this.onCurrentViewInit.bind(this) )
		currentPage.initView();
	}

	MainPage.prototype.onCurrentViewInit = function()
	{
		JSP.Pages[ JSP.routeManager.current.id ].unbind( JSP.Pages[ JSP.routeManager.current.id ].EVENT.VIEW_INIT, this.onCurrentViewInit.bind(this) );

		if( this.hasLoading )
		{
			this.Loader.bind.call(this.Loader, this.Loader.EVENT.HIDDEN, this.hidden.bind(this) );
			this.Loader.hide.call(this.Loader);
		}
		else
		{
			this.showCurrentPage();	
		}
		
	};


	MainPage.prototype.hidden = function()
	{
		this.Loader.unbind.call(this.Loader, this.Loader.EVENT.HIDDEN, this.hidden.bind(this) );

		var currentPage = JSP.Pages[ JSP.routeManager.current.id ];
		currentPage.Loader = null;

		this.Loader.destroy.call(this.Loader);
		this.Loader = null;

		this.showCurrentPage();		
	}

	MainPage.prototype.showCurrentPage = function()
	{
		JSP.Pages[ JSP.routeManager.current.id ].bind( JSP.Pages[ JSP.routeManager.current.id ].EVENT.SHOWN, this.viewShown.bind(this) );
		JSP.Pages[ JSP.routeManager.current.id ].show();
	}

	MainPage.prototype.viewShown = function()
	{
		this.id    = "main";
		this.Model = null;

		JSP.console.log("Main page displayed !");
		
	}

	return new MainPage();

})(jQuery);