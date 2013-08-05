JSP.Pages = {};

JSP.Page = (function(window){

	function Page(){

		this.Model  = null;   //JSP.Model
		this.Loader = null;   //JSP.Loader
		this.View   = null;   //JSP.View
		this.id     = "index";
		this.name   = "index";
		this.events = {};
		this.EVENT  = {
			VIEW_INIT     : "viewInit",
			SHOWN 		  : "shown",
			HIDDEN 		  : "hidden",
			INIT_TABLET   : "InitTablet",
			IS_MUTED      : "IsMuted",
			IS_UNMUTED    : "IsUnMuted"
		};

		this.data   = {}; //empty container
	};

	Page.prototype = 
	{
		bind : function(name, f)
		{
			//alert("bind :: "+name)
			this.events[name] = new signals.Signal();
			this.events[name].add(f);
		},
		unbind : function(name, f)
		{
			if(f != undefined)
			{
				this.events[name].remove(f);
				delete this.events[name];
			}	
			else if( name != undefined)
			{
				this.events[name].removeAll();
				delete this.events[name];
			}	
			else
			{
				for(var name in this.events)
				{
					this.unbind(name);
				}
			}
		},
		dispatch : function(name)
		{
			if( this.events[name] == undefined ) // Only if the event is registred
				return;

			this.events[name].dispatch();

		},
		init   : function(id, name)
		{
			this.id = id;
			this.name = name;

			this.initModel();
		},
		initModel : function()
		{
			this.Model = JSP.dataManager.find(this.id, this.name);
		},
		initView : function()
		{
			this.View = JSP.Views[ this.id ];
			
			this.View.bind( this.View.EVENT.INIT, this.onViewInit.bind(this));

			this.View.init( { id : this.id, name : this.name, Model : this.Model} );
		},
		onViewInit : function()
		{
			this.View.unbind( this.View.EVENT.INIT, this.onViewInit.bind(this));
			this.dispatch(this.EVENT.VIEW_INIT);

			//this.show();
		},
		hideLoader : function()
		{
			//hide Loader
			this.Loader.bind.call(this.Loader, this.Loader.EVENT.HIDDEN, this.loaderHidden.bind(this) );
			this.Loader.hide.call(this.Loader);
		},
		load : function()
		{
			if(this.Loader == null)
				this.Loader = new JSP.Loader();

			this.Loader.init.call(this.Loader);

			//Data
			if( this.Model.get("html") == undefined)
			{
				this.addDataToLoad();
			}
				
			//Assets
			this.addAssetsToLoad();
			
			this.Loader.bind.call(this.Loader, this.Loader.EVENT.ENDED, this.loaded.bind(this) );
			this.Loader.start.call(this.Loader);
			
		},
			addDataToLoad : function()
			{
				this.Loader.add.call(this.Loader, [{ src: this.Model.url, type:"data", name:"html" }]);
			},
			addAssetsToLoad : function()
			{
				this.Loader.add.call(this.Loader, this.Model.assets);
			},

		loaded : function()
		{
			this.Loader.unbind.call(this.Loader, this.Loader.EVENT.ENDED, this.loaded.bind(this) );

			if( this.Model.get("html") == undefined)
			{
				var indexHTML = this.Loader.aKeyToItems["html"];
				var html      = this.Loader.aItems[indexHTML].data;

				this.Model.set("html", html);
			}

			this.initView();
			this.hideLoader();
		},
		loaderHidden : function()
		{
			this.Loader.unbind.call(this.Loader, this.Loader.EVENT.HIDDEN, this.loaderHidden.bind(this) );
			this.Loader.destroy.call( this.Loader );
			this.Loader = null;
		},
		show : function()
		{
			this.View.bind.call( this.View, this.View.EVENT.SHOWN, this.shown.bind(this) );
			this.View.show();
		},
			shown : function()
			{
				this.View.unbind.call( this.View, this.View.EVENT.SHOWN, this.shown.bind(this) );
				this.dispatch( this.EVENT.SHOWN );
			},
		hide : function()
		{
			this.View.bind.call( this.View, this.View.EVENT.HIDDEN, this.hidden.bind(this) );
			this.View.hide();
		},
			hidden : function()
			{
				this.View.unbind.call( this.View, this.View.EVENT.HIDDEN, this.hidden.bind(this) );
				this.dispatch( this.EVENT.HIDDEN );
			},
		unload : function()
		{

		}
	}

	return Page;
 
})(window);