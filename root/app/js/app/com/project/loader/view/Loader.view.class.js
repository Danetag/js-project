JSP.LoaderViews = {};

JSP.LoaderView = (function(window){

	function LoaderView(){};

	LoaderView.prototype = 
	{
		events   : {},
		EVENT    : {
			SHOWN    : "shown",
			HIDDEN   : "hidden"
		},
		$ : {

		},
		html : "",
		init : function()
		{
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
		show : function()
		{
			this.dispatch( this.EVENT.SHOWN );
		},
		hide : function()
		{
			this.dispatch( this.EVENT.HIDDEN );
		},
		destroy : function()
		{

		}
		
	}

	return LoaderView;
 
})(window);