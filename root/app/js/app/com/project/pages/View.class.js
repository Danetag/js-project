JSP.Views = JSP.Views || {};

JSP.View = (function(window){

	function View (){

		JSP.EventDispatcher.call(this);

		this.$ = {
			page   : null
		};
		
		this.EVENT    = {
			INIT     	: "init",
			SHOWN    	: "shown",
			HIDDEN   	: "hidden",
			INIT_TABLET : "InitTablet",
			POPUP_OPEN 	: "PopupOpen",
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

	View.prototype = Object.create(JSP.EventDispatcher.prototype);
	View.prototype.constructor = View;

	View.prototype.init = function(o)
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
	}

	View.prototype.el = function()
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
	}
	View.prototype.initDOM    = function()
	{

	}

	// TO OVERRIDE
	View.prototype.onPopupOpened = function()
	{
		this.dispatch(this.EVENT.POPUP_OPEN);
	}
	View.prototype.onPopupClosed = function()
	{
		this.dispatch(this.EVENT.POPUP_CLOSE);
	}


	View.prototype.bindEvents = function()
	{
		
	}
	View.prototype.bindLinkEvents = function()
	{
		JSP.Views.main.bindEvents();
	}
	View.prototype.unbindEvents = function()
	{
		
	}
	View.prototype.unbindLinkEvents = function()
	{
		JSP.Views.main.unbindEvents();
	}
	View.prototype.unbindPopup = function()
	{
		if( !this.isPopup )
		{
	        JSP.PopupsManager.unbind(JSP.PopupsManager.EVENT.OPEN, this.onPopupOpened.bind(this));
    		JSP.PopupsManager.unbind(JSP.PopupsManager.EVENT.CLOSE, this.onPopupClosed.bind(this));

	        this.unbindLinkEvents();
	    }
	}
	View.prototype.show = function()
	{
		this.bindEvents();

		if( !this.isPopup )
			this.bindLinkEvents();

		this.dispatch( this.EVENT.SHOWN );
	}
	View.prototype.hide = function()
	{
		this.unbindPopup();
		this.dispatch( this.EVENT.HIDDEN );
		//this.destroy();
	}
	View.prototype.destroy = function() 
	{
		this.unbindEvents();
		this.destroyTL();

		this.$.page.remove();
		this.$ = {};
	}
	View.prototype.killTL = function(name)
	{
		if( this.TL[name] == undefined || this.TL[name] == null )
			return;

		var tl = this.TL[name];

		tl.stop();
		tl.kill();
		tl.clear();
		tl = null;

	}
	View.prototype.destroyTL = function()
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

	return View;	

})(window);