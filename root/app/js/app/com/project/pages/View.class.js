JSP.Views = JSP.Views || {};

JSP.View = (function($){

	var View = function(){
		this.$ = {

		};
		this.events   = {};
		this.EVENT    = {
			SHOWN    : "shown",
			HIDDEN   : "hidden"
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

		init : function()
		{
			this.el();
			this.bindEvents();
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