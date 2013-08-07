JSP.Card = (function(window){

	function Card(id, name){

		this.id      = id;
		this.name    = name;
		this.idxCard = parseInt( name.replace("card", ''), 10 );

		this.Model  = null;
		this.View   = null;
		this.Loader = null;

		this.events   = {};

		this.EVENT    = {
			INITVIEW : "initView",
			LOADED   : "loaded",
			INIT     : "init",
			SHOWN    : "shownCard",
			HIDDEN   : "hiddenCard"
		};
	};

    //Public override

    Card.prototype  = 
	{
		init : function()
		{
			this.initModel();
		},
		initModel : function()
		{
			this.Model = JSP.dataManager.find(this.id, this.name);
		},
		initView : function()
		{
			this.View = new JSP.CardView();

			this.View.bind.call(this.View, this.View.EVENT.INIT, this.onViewInit.bind(this));
			this.View.init.call(this.View , this.Model, this.name, this.idxCard );
		},
		bind : function(name, f)
		{
			this.events[name] = new signals.Signal();
			this.events[name].add(f);
		},
		unbind : function(name, f)
		{
			if(f != undefined && this.events[name] != undefined )
				this.events[name].remove(f);
			else if( name != undefined)
				this.events[name].removeAll();
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
		load : function()
		{
			this.Loader = new JSP.Loader();
			this.Loader.loaderView  = new JSP.LoaderViews.Card(); //basic

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

			this.dispatch( this.EVENT.LOADED );

			//this.initView();
			this.hideLoader();
		},
		hideLoader : function()
		{
			//hide Loader
			this.Loader.bind.call(this.Loader, this.Loader.EVENT.HIDDEN, this.loaderHidden.bind(this) );
			this.Loader.hide.call(this.Loader);
		},
		loaderHidden : function()
		{
			this.Loader.unbind.call(this.Loader, this.Loader.EVENT.HIDDEN, this.loaderHidden.bind(this) );
			this.Loader.destroy.call( this.Loader );
			this.Loader = null;			
		},
		onViewInit : function()
		{
			this.View.unbind.call(this.View, this.View.EVENT.INIT, this.onViewInit.bind(this));
			this.dispatch(this.EVENT.INITVIEW);
		},
		show : function()
		{
			this.View.bind.call( this.View, this.View.EVENT.SHOWN, this.shown.bind(this) );
			this.View.show.call( this.View )
		},
		shown : function()
		{
			this.View.unbind.call( this.View, this.View.EVENT.SHOWN, this.shown.bind(this) );
			this.dispatch( this.EVENT.SHOWN );
		},
		hideInterCard : function()
		{
			this.View.hideInterCard.call( this.View )
		},
		hide : function()
		{
			this.View.bind.call( this.View, this.View.EVENT.HIDDEN, this.hidden.bind(this)  ); //this.hidden.bind(this) 
			this.View.hide.call( this.View )
		},
		hidden : function()
		{
			this.View.unbind.call( this.View, this.View.EVENT.HIDDEN, this.hidden.bind(this) );
			this.dispatch( this.EVENT.HIDDEN );
		},
		deleteClass : function()
		{
			this.View.deleteClass.call(this.View);
		},
		destroy : function()
		{
			this.View.destroy.call(this.View);
			this.unbind();
			
			this.Model = null;
			this.View  = null;
		}

	}

	return Card;

})(window);




