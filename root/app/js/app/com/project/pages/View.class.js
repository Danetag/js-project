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
			INIT_TABLET : "InitTablet",
			POPUP_OPEN : "PopupOpen",
			POPUP_CLOSE : "PopupClose"
		};

		this.TL = {};

		this.id    				= null;
		this.name  				= null;
		this.Model 				= null;
		this.jSVar 				= null;
		this.bodyClass 		  	= null;
		this.popupClass 		= null;
		this.isPopup 			= false;
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
			this.id    				= o.id;
			this.name  				= o.name;
			this.Model 				= o.Model;
			this.jSVar 				= o.jSVar;
			this.bodyClass 			= o.bodyClass;
			this.popupClass 		= o.popupClass;
			this.isPopup 			= o.isPopup || false;

			this.el();
			this.initDOM();
			this.dispatch(this.EVENT.INIT);
		},
		el : function()
		{
			if(!this.isPopup)
			{
				//clean body class
				JSP.Views.main.$.body.removeClass();

				if( this.bodyClass != null )
				{
					JSP.Views.main.$.body.addClass(this.bodyClass);
				}

				//popupManager
				JSP.PopupsManager.bind(JSP.PopupsManager.EVENT.OPEN, this.onPopupOpened.bind(this));
        		JSP.PopupsManager.bind(JSP.PopupsManager.EVENT.CLOSE, this.onPopupClosed.bind(this));
				
			}
			
			/*
			//Already did in PopupManager !
			else
			{
				//add popup Class
				if( this.popupClass != null )
					JSP.PopupsManager.$.popupContainer.addClass(this.popupClass);
			}
			*/

			//get page
			this.$.page = $("#page-" + this.name );

			if( this.$.page[0] == undefined || !JSP.conf.hasPushState ) //no fiche
			{
				//inject HTML
				var $html = $.parseHTML(this.Model.get("html"));

				if( !this.isPopup )
				{
					JSP.Views.main.$.content.empty()
											.show()
											.html($html);
				}	
				else
					JSP.PopupsManager.append($html)
				
				this.$.page = $("#page-" + this.name);

				if( this.isPopup )
					this.$.page.addClass("popup-content");
			}
		},
		initDOM    : function()
		{

		},

		// TO OVERRIDE
		onPopupOpened : function()
		{
			this.dispatch(this.EVENT.POPUP_OPEN);
		},
		onPopupClosed : function()
		{
			this.dispatch(this.EVENT.POPUP_CLOSE);
		},


		bindEvents : function()
		{
			
		},
		bindLinkEvents : function()
		{
			JSP.Views.main.bindEvents();
		},
		unbindEvents : function()
		{
			
		},
		unbindLinkEvents : function()
		{
			JSP.Views.main.unbindEvents();
		},
		unbindPopup : function()
		{
			if( !this.isPopup )
			{
		        JSP.PopupsManager.unbind(JSP.PopupsManager.EVENT.OPEN, this.onPopupOpened.bind(this));
        		JSP.PopupsManager.unbind(JSP.PopupsManager.EVENT.CLOSE, this.onPopupClosed.bind(this));

		        this.unbindLinkEvents();
		    }
		},
		show : function()
		{
			this.bindEvents();

			if( !this.isPopup )
				this.bindLinkEvents();

			this.dispatch( this.EVENT.SHOWN );
		},
		hide : function()
		{
			this.unbindPopup();
			this.dispatch( this.EVENT.HIDDEN );
			//this.destroy();
		},
		destroy : function() 
		{
			this.unbindEvents();
			this.destroyTL();

			this.$.page.remove();
			this.$ = {};
		},
		killTL : function(name)
		{
			if( this.TL[name] == undefined || this.TL[name] == null )
				return;

			var tl = this.TL[name];

			tl.stop();
			tl.kill();
			tl.clear();
			tl = null;

		},
		destroyTL : function()
		{
			for(var i in this.TL)
			{
				var tl = this.TL[i];

				if(tl == null)
					continue;

				tl.stop();
				tl.kill();
				tl.clear();
				tl = null;
			};

			this.TL = {};
		}

	};

	return View;	

})(jQuery);