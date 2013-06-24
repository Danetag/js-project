JSP.Pages = {};

JSP.Page = (function(window){

	function Page(){};

	Page.prototype = 
	{
		Model  : null,   //JSP.Model
		Loader : null,   //JSP.Loader
		View   : null,   //JSP.View
		id     : "index",
		events   : {},
		EVENT  : {
			SHOWN : "shown",
			HIDDEN: "hidden",
		},
		bind : function(name, f)
		{
			this.events[name] = new signals.Signal();
			this.events[name].add(f);
		},
		unbind : function(name, f)
		{
			this.events[name].remove(f);
		},
		dispatch : function(name)
		{
			if( this.events[name] == undefined ) // Only if the event is registred
				return;

			this.events[name].dispatch();

		},

		init   : function(id)
		{
			this.id = id;

			this.initModel();
		},
		initModel : function()
		{
			this.Model = JSP.dataManager.find(this.id);
		},
		initView : function()
		{
			this.View = JSP.Views[ this.id ];
			this.View.init();
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
				this.Loader.add.call(this.Loader, [{ src: this.Model.url, type:"data" }]);
			}
				
			//Assets
			this.Loader.add.call(this.Loader, this.Model.assets);
			
			this.Loader.bind.call(this.Loader, this.Loader.EVENT.ENDED, this.loaded.bind(this) );
			this.Loader.start.call(this.Loader);
			
		},
		loaded : function()
		{
			this.Loader.unbind.call(this.Loader, this.Loader.EVENT.ENDED, this.loaded.bind(this) );

			this.initView();
			this.hideLoader();
		},
		update : function()
		{

		},
		loaderHidden : function()
		{
			this.Loader.destroy.call( this.Loader );
			this.Loader == null;
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