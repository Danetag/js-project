
JSP.PopupsManager = {};

(function(window){

   	function PopupsManager()
   	{
   		JSP.EventDispatcher.call(this);

   		this.html   = '<div id="popup-container"><div class="overlay"></div></div>';
   		this.route  = null; 
   		this.nextID = null;
   		this.nextUrl = null;
   		this.isWorking = false;

        this.EVENT = {
            OPEN       : "open",
            CLOSE      : "close"
        };

   		this.$ = {
   			popupContainer : null,
   			overlay : null,
   			popupContent : null
   		}

   		this.isOpen = false;
   	};

   	PopupsManager.prototype = Object.create(JSP.EventDispatcher.prototype);
	PopupsManager.prototype.constructor = PopupsManager;
    
	// PUBLIC
	PopupsManager.prototype.open = function(id)
	{
		if(this.isWorking) //not during transition
			return;

		if( this.$.popupContainer != null )
		{
			this.nextID = id;

			//change popup
			this.changePopup();
			return;
		}

		this.isWorking = true;

		this.nextID = null;

		this.route = JSP.routeManager.getRouteObject(id, JSP.conf.lang);

		this.dispatch( this.EVENT.OPEN );

		_initDOM.call(this);
		_routePopup.call(this);

	}
	PopupsManager.prototype.append = function($html)
	{
		if(this.$.popupContainer == null)
		{
			//JSP.console.log("this.$.popupContainer is null, please open the link through the PopupsManager");
			return;
		}

		this.$.popupContainer.append($html);
	}
	PopupsManager.prototype.bindEvents = function()
	{
		var self = this;

		this.$.overlay.on("click", function()
		{
			self.close();
		})
	}
	PopupsManager.prototype.unbindEvents = function()
	{
		this.$.overlay.off("click");
	}
	PopupsManager.prototype.changePopup = function()
	{
		this.close();
	}
	PopupsManager.prototype.close = function()
	{
		this.isOpen = false;
		this.isWorking = true;
		
		JSP.Pages[ this.route.id ].bind( JSP.Pages[ this.route.id ].EVENT.HIDDEN, _currentPopinHidden.bind(this) );
		JSP.Pages[ this.route.id ].hide();
	}
	PopupsManager.prototype.destroy = function()
	{
		var self = this;

		TweenLite.to( self.$.popupContainer, 0.7, { autoAlpha:0 , ease:Cubic.easeOut , onComplete: function(){ 

			self.$.popupContainer.remove();
			self.$.popupContainer = null;

			self.isWorking = false;

			self.dispatch( self.EVENT.CLOSE );

			if( self.nextID != null )
			{
				self.open( self.nextID );
			}

		}});
		
	}
		

	var _initDOM = function()
	{
		JSP.Views.main.$.body.prepend(this.html);

		this.$.popupContainer = $("#popup-container");
		this.$.overlay 		  = this.$.popupContainer.find(".overlay");
		this.$.popupContent   = this.$.popupContainer.find(".popup-content");
	}

	var _routePopup = function()
	{
		this.route.isPopup = true;
		this.isOpen = true;

		JSP.Pages[ this.route.id ].init( this.route ); //init Controller

		_initPopupClass.call(this);

		//show overlay
		TweenLite.to( this.$.overlay, 0.4, { autoAlpha:1 , ease:Cubic.easeOut});

		JSP.Pages[ this.route.id ].bind( JSP.Pages[ this.route.id ].EVENT.IS_LOADED, _popupLoaded.bind(this) );
		JSP.Pages[ this.route.id ].load();
	}

	var _initPopupClass = function()
	{
		if(this.route.popupClass != null)
			this.$.popupContainer.addClass(this.route.popupClass);
	}

	var _popupLoaded = function()
	{
		JSP.Pages[ this.route.id ].unbind( JSP.Pages[ this.route.id ].EVENT.IS_LOADED, _popupLoaded.bind(this) );

		//init view next one
		JSP.Pages[ this.route.id ].bind( JSP.Pages[ this.route.id ].EVENT.VIEW_INIT, _nextPageViewInit.bind(this) );
		JSP.Pages[ this.route.id ].initView();
	}

	var _nextPageViewInit = function()
	{
		JSP.Pages[ this.route.id ].unbind( JSP.Pages[ this.route.id ].EVENT.VIEW_INIT, _nextPageViewInit.bind(this) );

		// Destroy the loader
		JSP.Pages[ this.route.id ].bind( JSP.Pages[ this.route.id ].EVENT.LOADER_IS_DESTROYED, _loaderDestroyed.bind(this) );
		JSP.Pages[ this.route.id ].hideLoader();
	}

	var _loaderDestroyed = function()
	{
		JSP.Pages[ this.route.id ].unbind( JSP.Pages[ this.route.id ].EVENT.LOADER_IS_DESTROYED, _loaderDestroyed.bind(this) );

		// Finally, show it ! (bind event actually)
		JSP.Pages[ this.route.id ].bind( JSP.Pages[ this.route.id ].EVENT.SHOWN, _nextPageShow.bind(this) );
		JSP.Pages[ this.route.id ].show();
	}

	var _nextPageShow = function()
	{
		JSP.Pages[ this.route.id ].unbind( JSP.Pages[ this.route.id ].EVENT.SHOWN, _nextPageShow.bind(this) );

		//bind
		this.bindEvents();

		this.isWorking = false;
	}

	var _currentPopinHidden = function()
	{
		JSP.Pages[ this.route.id ].unbind( JSP.Pages[ this.route.id ].EVENT.HIDDEN, _currentPopinHidden.bind(this) );

		this.unbindEvents();	
		this.destroy();

	}
    
	JSP.PopupsManager = new PopupsManager();

})(window);
