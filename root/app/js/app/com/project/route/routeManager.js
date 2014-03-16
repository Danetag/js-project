JSP.routeManager = {};

(function($){

    var History  = null;

    /* Action */
    
    function RouteManager(){

    	JSP.EventDispatcher.call(this);

		this.EVENT    = {
			LOADED    : "loaded"
		};

		this.routes  = {}
		this.current = null,
		this.next    = null,

    	this.firstTime = true;
    	this.openShareAfter = false;
    }

    RouteManager.prototype = Object.create(JSP.EventDispatcher.prototype);
	RouteManager.prototype.constructor = RouteManager;

	// PUBLIC
	RouteManager.prototype.init = function(data)
    {
    	History = window.History;

    	this.initRoutes(data);
    	this.bindEvents();

    	if( !JSP.conf.hasPushState )
    		this.onStateChange(null, true);	
    	else
    		this.onStateChange();	
    }

    RouteManager.prototype.bindEvents = function()
    {
    	//JSP.PopupsManager.bind( JSP.PopupsManager.EVENT.CLOSE, this.onPopupManagerClose.bind(this) );
    	History.Adapter.bind(window,'statechange', this.onStateChange.bind(this) );
    }
    RouteManager.prototype.unbindEvents = function()
    {

    }

    RouteManager.prototype.initRoutes = function(data)
    {

    	for(var name in data.pages)
    	{
    		var page = data.pages[name];
    		var id = page.id;

    		////JSP.console.log(page)

    		for(var lang in page)
    		{
    			if(lang == "id" || lang == "bodyClass" || lang == "jSVar" || lang == "popupClass" )
    				continue;

    			if(this.routes[lang] == undefined)
    				this.routes[lang] = []; //first

    			var pageLang = page[lang];

    			if(id == "homepage")
    				continue;

    			//////JSP.console.log("route", { url : pageLang.route, name : pageLang.label, id : id } )

    			var routeOject =  new JSP.Route();
    			routeOject.init.call( routeOject, { 
    				url   		: pageLang.route, 
    				name  		: pageLang.name, 
    				id    	    : id, 
    				title 		: pageLang.title,
    				jSVar 		: page.jSVar,
    				bodyClass   : ( page.bodyClass != undefined && page.bodyClass.length ) ? page.bodyClass : null,
    				popupClass   : ( page.popupClass != undefined && page.popupClass.length ) ? page.popupClass : null
    			});

    			this.routes[lang].push ( routeOject );
    		}
    	}

    	////JSP.console.log(this.routes)

    }
    RouteManager.prototype.onStateChange = function(e, f){

    	var force = f || false;
		var State = History.getState(); // Note: We are using History.getState() instead of event.state

        //JSP.console.log("onStateChange :: ", State.data, State.title, State.url); //alert in IE8

        var page     =  null;

        if( !JSP.conf.hasPushState ) //prevent double redirection from History.js
		{	

			State.url = JSP.helpers.Url.fixHash(State.url);

			//JSP.console.log("url fixed :: " + State.url)

			page     = this.getCurrentRoute(State);

			if( this.current != null && this.firstTime && ( ( this.current.id != page.id || this.current.name != page.name ) ) )
			{
				//si pas de second passage lors du 1er chargement
				////JSP.console.log("PASSAGE :: ", this.current.id ," , ", page.id ," , ", this.current.name ," , ", page.name)
				this.firstTime = false;

				if(page.id == "index" )
				{
					//JSP.console.log("YOU SHALL NOT PASS");
					return; // YOU SHALL NOT PASS
				}
					
			}	

			////JSP.console.log("firstTime :: "+this.firstTime)

			if( this.firstTime )
			{
				
				this.current = { id : page.id, name : page.name, title : page.title, jSVar : page.jSVar, bodyClass: page.bodyClass, popupClass : page.popupClass};
				
				////JSP.console.log(">>> first, go to page", page.id)

				////JSP.console.log("force :: "+force)
				
				if(!force) //si second passage lors du 1er chargement
					this.firstTime = false;
				else
					JSP.Pages.main.init(); // INIT NOW ON FORCE

				return;
			}

		}	

        page  = this.getCurrentRoute(State);
        //JSP.console.log(">>> go to page", page.id)
        this.next = { id : page.id, name : page.name, title : page.title, jSVar : page.jSVar, bodyClass: page.bodyClass, popupClass : page.popupClass};

        //////JSP.console.log("onStateChange this.next.id", this.next.id, this.current)
        //alert("this.next.id :: "+this.next.id)

        //hide if not new
        if(this.current != null )
        {

        	var currentRouteObject = this.getCurrentRouteObject();

        	//////JSP.console.log("test", currentRouteObject.id , this.next.id , currentRouteObject.name , this.next.name )
        	if( currentRouteObject.id != this.next.id || currentRouteObject.name != this.next.name || force )
        	{

        		//GA
        		//////JSP.console.log('GA :: send', 'pageview', {'page': State.url,'title': State.title} )
				//ga('send', 'pageview', {'page': State.url,'title': State.title} );
				//_gaq.push(['_trackPageview', page.url]);
				////JSP.console.log("router", page.url)

				//title
				document.title = this.next.title;

        		//////JSP.console.log("page to load", page, "hide it ", JSP.Pages[ this.current.id ])
        		if( JSP.PopupsManager.isOpen )
	    		{
	    			JSP.Pages[ this.current.id ].View.bind( JSP.Pages[ this.current.id ].View.EVENT.POPUP_CLOSE, this.onPopupManagerClose.bind(this) );
	    			JSP.PopupsManager.close();
	    		}
	    		else
        		{
        			this.changePage();
        		}	
        		
        		
        	}

    	}
    	else
    	{
    		//new
    		this.current = this.next;
    		//////JSP.console.log("this.current", this.current)
    	}
	}
	RouteManager.prototype.onPopupManagerClose = function()
	{
		JSP.Pages[ this.current.id ].View.unbind( JSP.Pages[ this.current.id ].View.EVENT.POPUP_CLOSE, this.onPopupManagerClose.bind(this) );
		this.changePage();
	}
	RouteManager.prototype.changePage = function()
	{
		JSP.Pages[ this.current.id ].unbindEvents();
		JSP.Pages[ this.next.id ].init( this.next ); //init Controller

		//hide old one
		JSP.Pages[ this.current.id ].bind( JSP.Pages[ this.current.id ].EVENT.HIDDEN, this.currentPageHidden.bind(this) );
	    JSP.Pages[ this.current.id ].hide();
	}
	RouteManager.prototype.currentPageHidden = function()
	{
		JSP.Pages[ this.current.id ].unbind( JSP.Pages[ this.current.id ].EVENT.HIDDEN, this.currentPageHidden.bind(this) );

		JSP.Pages[ this.next.id ].bind( JSP.Pages[ this.next.id ].EVENT.LOADER_VIEW_SHOWN, this.nextLoaderViewShown.bind(this) );
		JSP.Pages[ this.next.id ].bind( JSP.Pages[ this.next.id ].EVENT.IS_LOADED, this.nextLoaded.bind(this) );
		JSP.Pages[ this.next.id ].load();
	}
		RouteManager.prototype.nextLoaderViewShown = function()
		{
			JSP.Pages[ this.next.id ].unbind( JSP.Pages[ this.next.id ].EVENT.LOADER_VIEW_SHOWN, this.nextLoaderViewShown.bind(this) );

			//destroy the old 
			JSP.Pages[ this.current.id ].destroy();
		}
	RouteManager.prototype.nextLoaded = function()
	{
		JSP.Pages[ this.next.id ].unbind( JSP.Pages[ this.next.id ].EVENT.IS_LOADED, this.nextLoaded.bind(this) );

		//init view next one
		JSP.Pages[ this.next.id ].bind( JSP.Pages[ this.next.id ].EVENT.VIEW_INIT, this.nextPageViewInit.bind(this) );
		JSP.Pages[ this.next.id ].initView();
	}
	
	RouteManager.prototype.nextPageViewInit = function()
	{
		JSP.Pages[ this.next.id ].unbind( JSP.Pages[ this.next.id ].EVENT.VIEW_INIT, this.nextPageViewInit.bind(this) );

		// Destroy the loader
		JSP.Pages[ this.next.id ].bind( JSP.Pages[ this.next.id ].EVENT.LOADER_IS_DESTROYED, this.loaderDestroyed.bind(this) );
		JSP.Pages[ this.next.id ].hideLoader();
	}
	RouteManager.prototype.loaderDestroyed = function()
	{
		JSP.Pages[ this.next.id ].unbind( JSP.Pages[ this.next.id ].EVENT.LOADER_IS_DESTROYED, this.loaderDestroyed.bind(this) );

		// Finally, show it ! (bind event actually)
		////JSP.console.log("routeManager should bind shown of :: ", this.next.id )
		JSP.Pages[ this.next.id ].bind( JSP.Pages[ this.next.id ].EVENT.SHOWN, this.nextPageShow.bind(this) );
		JSP.Pages[ this.next.id ].show();
	}
	RouteManager.prototype.nextPageShow = function()
	{
		////JSP.console.log("routeManager should UNbind shown of :: ", this.next.id )
		JSP.Pages[ this.next.id ].unbind( JSP.Pages[ this.next.id ].EVENT.SHOWN, this.nextPageShow.bind(this) );

		this.current = this.next; //new current
		//////JSP.console.log("new this.current", this.current)

	}
    RouteManager.prototype.getRoute = function(key, lang)
    {
    	var l = lang || JSP.conf.lang;

    	for (var i in this.routes[l])
    	{
    		var route = this.routes[l][i];

    		if(route.name == key)
    			return route.url;
    	}

    	return null;
    }
    RouteManager.prototype.getRouteObject = function(key, lang)
    {
    	var l = lang || JSP.conf.lang;

    	for (var i in this.routes[l])
    	{
    		var route = this.routes[l][i];

    		if(route.name == key)
    			return route;
    	}

    	return null;
    }
    RouteManager.prototype.getCurrentRoute = function(State)
    {

    	for(var i in this.routes[JSP.conf.lang] )
    	{
    		if( State.url  == JSP.conf.baseUrl + this.routes[JSP.conf.lang][i].url || 
    			State.url  == JSP.conf.baseUrl + this.routes[JSP.conf.lang][i].url + "/" )
    		{
    			return this.routes[JSP.conf.lang][i];
    		}

    		// with # ?

    		////JSP.console.log(State.url+ " =?= " + JSP.conf.baseUrl + this.routes[JSP.conf.lang][i].urlHashed)

    		if( State.url  == JSP.conf.baseUrl + this.routes[JSP.conf.lang][i].urlHashed )
    		{
    			return this.routes[JSP.conf.lang][i];
    		}

    	}

    	return this.getRouteObject("index", JSP.conf.lang);
    }
    RouteManager.prototype.getCurrentRouteObject = function()
    {

    	for(var i in this.routes[JSP.conf.lang] )
    	{
    		var route = this.routes[JSP.conf.lang][i];

    		if( route.id  == this.current.id && route.name  == this.current.name  )
    		{
    			return route ;
    		}
    	}
    }
    RouteManager.prototype.getCurrentPage = function()
    {
    	return JSP.pages[ this.current ];
    }
    RouteManager.prototype.goToCard = function(cardID)
    {
    	var routeObj = this.getRouteObject("card0"+cardID);

    	//console.log("routeObj", routeObj)
    	var href = routeObj.url;

    	if( !JSP.conf.hasPushState  )
			href = routeObj.urlHashed

		href = JSP.conf.baseUrl + href;

		//openPopupAfter;
		this.openShareAfter = true;

		History.pushState(null, null, href );
    }

	JSP.routeManager = new RouteManager();

})(jQuery);