JSP.Views = JSP.Views || {};

JSP.View = (function($){

	var View = function(){
		this.$ = {
			page   : null
		};
		this.events   = {};
		this.EVENT    = {
			INIT     : "init",
			SHOWN    : "shown",
			HIDDEN   : "hidden",
			INIT_TABLET : "InitTablet"
		};


		this.id    = null;
		this.name  = null;
		this.Model = null;
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

		init : function(o)
		{
			this.id    = o.id;
			this.name  = o.name;
			this.Model = o.Model;

			this.el();
			this.bindEvents();
			this.dispatch(this.EVENT.INIT);
		},
		el : function()
		{

			this.$.page = $("#page-" + this.name );

			if( this.$.page[0] == undefined) //no fiche
			{
				//inject HTML
				$("#content").append( this.Model.get("html") );
				
				this.$.page = $("#page-" + this.name);

			}
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
			this.destroy();
		},
		destroy : function() 
		{
			this.unbindEvents();

			this.$.page.remove();
			this.$ = {};
		}

	};

	return View;	

})(jQuery);