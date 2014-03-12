JSP.LoaderViews = {};

JSP.LoaderView = (function(window){

	function LoaderView(){
		this.events   = {};
		this.EVENT    = {
			SHOWN    : "shown",
			HIDDEN   : "hidden"
		};
		this.$ = {

		};

		this.TL = {};

		this.html = "";
		this.nbItemsToLoad = 0;
		this.pct = 0;
	};

	LoaderView.prototype = 
	{
		init : function(nbItems)
		{
			this.nbItemsToLoad = nbItems;

			this.el();
			this.append();
			this.bindEvents();
		},
		bind : function(name, f)
		{
			this.events[name] = new signals.Signal();
			this.events[name].add(f);
		},
		unbind : function(name, f)
		{
			if(f != undefined)
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
		bindEvents : function()
		{

		},
		unbindEvents : function()
		{

		},
		el : function()
		{

		},
		append : function()
		{

		},
		setPct : function(pct) //to override
		{

		},
		show : function()
		{
			this.dispatch( this.EVENT.SHOWN );
		},
		hide : function()
		{

			this.unbind();
			this.unbindEvents();

			this.dispatch( this.EVENT.HIDDEN );
		},
		destroyTL : function()
		{
			for(var i=0; i < this.TL.length; i++ )
			{
				var tl = this.TL[i];

				if(tl == null)
					continue;

				tl.kill();
				tl.clear();
				tl = null;
			};

			this.TL = {};
		},
		destroy : function()
		{
			this.destroyTL();

			this.$.loader.remove();
			this.$.loader = null;
			
		}
		
	}

	return LoaderView;
 
})(window);