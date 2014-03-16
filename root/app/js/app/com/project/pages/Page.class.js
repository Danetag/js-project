JSP.Pages = JSP.Pages || {};

JSP.Page = (function(window){

	function Page(){ 

		JSP.EventDispatcher.call(this);

		this.Model  = null;   //JSP.Model
		this.Loader = null;   //JSP.Loader
		this.View   = null;   //JSP.View

		this.id     	 = "index";
		this.name   	 = "index";
		this.jSVar 		 = null;
		this.bodyClass   = null;
		this.popupClass  = null;
		this.isPopup     = false;

		this.EVENT  = {
			VIEW_INIT     		: "viewInit",
			SHOWN 		  		: "shown",
			HIDDEN 		  		: "hidden",
			INIT_TABLET   		: "InitTablet",
			IS_MUTED      		: "IsMuted",
			IS_UNMUTED    		: "IsUnMuted",
			IS_LOADED 			: "isLoaded",
			EXTRAS_LOADED       : "extrasLoaded",
			END 		  		: "End",
			LOADER_IS_DESTROYED : "LoaderIsDestroyed",
			LOADER_VIEW_SHOWN   : "LoaderViewShown"
		};

		this.assets   = [];
	}

    Page.prototype = Object.create(JSP.EventDispatcher.prototype);
	Page.prototype.constructor = Page;

	Page.prototype.init   = function(o)
	{
		this.id 	     = o.id;
		this.name        = o.name;
		this.jSVar       = o.jSVar;
		this.bodyClass   = o.bodyClass;
		this.popupClass  = o.popupClass;
		this.isPopup     = o.isPopup;

		this.initModel();
		this.initAssets();
	}
	
	Page.prototype.initModel = function()
	{
		this.Model = JSP.dataManager.find(this.id, this.name);
	}

	Page.prototype.initAssets = function() //to override in case
	{
		
	}

	Page.prototype.initView = function()
	{
		this.View = JSP.Views[ this.id ];
		
		this.View.bind( this.View.EVENT.INIT, this.onViewInit.bind(this));

		this.View.init({ 
			id    			 : this.id, 
			name  			 : this.name, 
			Model 			 : this.Model,
			jSVar 			 : this.jSVar,
			bodyClass 		 : this.bodyClass,
			popupClass 		 : this.popupClass,
			isPopup	         : this.isPopup
		});

	}
	
	Page.prototype.onViewInit = function()
	{
		this.View.unbind( this.View.EVENT.INIT, this.onViewInit.bind(this));
		this.dispatch(this.EVENT.VIEW_INIT);
	}

	Page.prototype.hideLoader = function()
	{
		//hide Loader
		this.Loader.bind.call(this.Loader, this.Loader.EVENT.HIDDEN, this.loaderHidden.bind(this) );
		this.Loader.hide.call(this.Loader);
	}
	
	Page.prototype.load = function()
	{

		if(this.Loader == null)
			this.Loader = new JSP.Loader();

		this.initLoaderView();

		this.Loader.init.call( this.Loader );

		//Data
		if( this.Model.get("html") == undefined)
		{
			this.addDataToLoad();
		}
			
		//Assets
		this.addAssetsToLoad();
		this.addAssetsFromPageToLoad();
		
		this.Loader.bind.call(this.Loader, this.Loader.EVENT.SHOWN, this.loaderShown.bind(this) );
		this.Loader.bind.call(this.Loader, this.Loader.EVENT.ENDED, this.loaded.bind(this) );
		this.Loader.start.call(this.Loader);
		
	}
	
	Page.prototype.initLoaderView = function() //to override
	{
		if(this.isPopup)
			this.Loader.loaderView = new JSP.LoaderViews.Popup(); //popup
	}

		Page.prototype.getDataToLoad = function()
		{
			var urlToLoad  = this.Model.url;

			if( urlToLoad.substr( urlToLoad.length-1 , 1) == "/" )
				urlToLoad += "index";

			return [{ src: urlToLoad + ".view", id:"html_" + this.id, type: createjs.LoadQueue.XML }];
		}
		
		Page.prototype.addDataToLoad = function()
		{
			var dataToLoad  = this.getDataToLoad();
			//this.showItemsToLoad( "dataToLoad", dataToLoad);

			this.Loader.add.call(this.Loader, dataToLoad);
		}
		
		Page.prototype.addAssetsToLoad = function()
		{
			//this.showItemsToLoad( "this.Model.assets", this.Model.assets);
			this.Loader.add.call(this.Loader, this.Model.assets);

			//console.log("addAssetsToLoad ;: JSP.Pages.main.View.mainLoaderDeleted", JSP.Pages.main.View.mainLoaderDeleted)

			// Ok, remove it only if it go to Scene
			if( !JSP.Pages.main.View.mainLoaderDeleted && JSP.routeManager.next.id.indexOf("scene0") > -1)
			{
				//Delete it. YES YOU CAN (I think)
				$("#loader").remove();
			}

			// Primary asset loaded ? Add them anyway, the loader will removed them in case
			this.Loader.add.call( this.Loader , JSP.dataManager.primaryAssets );
		}
		
		Page.prototype.addAssetsFromPageToLoad = function()
		{
			//this.showItemsToLoad( "this.assets", this.assets);
			this.Loader.add.call(this.Loader, this.assets);
		}

	Page.prototype.loaderShown = function()
	{
		this.Loader.unbind.call(this.Loader, this.Loader.EVENT.SHOWN, this.loaderShown.bind(this) );
		this.dispatch( this.EVENT.LOADER_VIEW_SHOWN );
	}
	
	Page.prototype.loaded = function()
	{
		this.Loader.unbind.call(this.Loader, this.Loader.EVENT.ENDED, this.loaded.bind(this) );

		if( this.Model.get("html") == undefined)
		{
			var html = $( this.Loader.getData("html_" + this.id, true) ).find("root").text();
			this.Model.set("html", html);
		}

		this.assets.length = 0;

		this.bind( this.EVENT.EXTRAS_LOADED, this.onCurrentExtrasLoaded.bind(this) )
		this.loadExtras();
	}

	Page.prototype.loadExtras = function()
	{
		//to override in case of extras
		this.dispatch( this.EVENT.EXTRAS_LOADED );
	}

	Page.prototype.onCurrentExtrasLoaded = function()
	{
		this.dispatch( this.EVENT.IS_LOADED );
	}
	
	Page.prototype.loaderHidden = function()
	{
		this.Loader.unbind.call(this.Loader, this.Loader.EVENT.HIDDEN, this.loaderHidden.bind(this) );
		this.Loader.destroy.call( this.Loader );
		this.Loader = null;

		this.dispatch( this.EVENT.LOADER_IS_DESTROYED);
	}
	
	Page.prototype.unbindEvents = function()
	{
		this.View.unbindEvents();
	}
	
	Page.prototype.show = function()
	{
		this.View.bind.call( this.View, this.View.EVENT.SHOWN, this.shown.bind(this) );
		this.View.show();
	}
		Page.prototype.shown = function()
		{
			this.View.unbind.call( this.View, this.View.EVENT.SHOWN, this.shown.bind(this) );
			this.dispatch( this.EVENT.SHOWN );
		}

	Page.prototype.hide = function()
	{
		this.View.bind.call( this.View, this.View.EVENT.HIDDEN, this.hidden.bind(this) );
		this.View.hide();
	}
		Page.prototype.hidden = function()
		{
			this.View.unbind.call( this.View, this.View.EVENT.HIDDEN, this.hidden.bind(this) );
			this.dispatch( this.EVENT.HIDDEN );
		}
	
	Page.prototype.destroy = function()
	{
		this.View.destroy();
	}
	
	Page.prototype.unload = function()
	{

	}
	
	Page.prototype.showItemsToLoad = function(name, items)
    {
    	for(var i = 0; i < items.length; i++)
    	{
    		//JSP.console.log("For "+name+" in loader :: "+ items[i].id + ", src :: " + items[i].src )
    	}
    }
	

	return Page;
 
})(window);