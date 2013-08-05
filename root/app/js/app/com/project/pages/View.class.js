JSP.Views = JSP.Views || {};

JSP.View = (function($){

	var View = function(){
		this.$ = {

		};
		this.events   = {};
		this.EVENT    = {
			INIT     : "init",
			SHOWN    : "shown",
			HIDDEN   : "hidden",
			INIT_TABLET : "InitTablet"
		};
	}

	View.prototype = {

		bind : function(name, f)
		{
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

		init : function()
		{
			this.el();
			this.bindEvents();
			this.dispatch(this.EVENT.INIT);
		},
		el : function()
		{

		},
		bindEvents : function()
		{
			
		},
		unbindEvents : function()
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
		update : function()
		{
			
		}

	};

	return View;	

})(jQuery);