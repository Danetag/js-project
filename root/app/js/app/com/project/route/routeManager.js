SNR.routeManager = {};

(function($){

    var History  = null;

    /* Action */
    
    var RouteManager = function(){}

	// PUBLIC
	RouteManager.prototype =  {
		events   : {},
		EVENT    : {
			LOADED    : "loaded"
		},
		routes : {},
		current : null,
		next    : null,
		init : function(data)
	    {
	    	History = window.History;

	    	this.initRoutes(data);
	    	this.bindEvents();

	    	this.onStateChange();	
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

	    bindEvents : function()
	    {
	    	History.Adapter.bind(window,'statechange', this.onStateChange.bind(this) );
	    },
	    unbindEvents : function()
	    {

	    },

	    initRoutes : function(data)
	    {
	    	for(var name in data.pages)
	    	{
	    		var page = data.pages[name];
	    		var id = page.id;

	    		//console.log("id", id)

	    		for(var lang in page)
	    		{
	    			if(lang == "id")
	    				continue;

	    			if(this.routes[lang] == undefined)
	    				this.routes[lang] = []; //first

	    			var pageLang = page[lang];

	    			//console.log("route", { url : pageLang.route, name : pageLang.label, id : id } )

	    			var routeOject =  new SNR.Route();
	    			routeOject.init.call( routeOject, { url : pageLang.route, name : pageLang.name, id : id }  );

	    			this.routes[lang].push ( routeOject );
	    		}
	    	}

	    	//console.log(this.routes)

	    },
	    onStateChange : function(){
		
			var State = History.getState(); // Note: We are using History.getState() instead of event.state
	        //History.log(State.data, State.title, State.url);

	        var page  = this.getCurrentRoute(State);
	        this.next = { id : page.id, name : page.name };

	        //hide if not new
	        if(this.current != null )
	        {

	        	var currentRouteObject = this.getCurrentRouteObject();

	        	//console.log("test", currentRouteObject.id , this.next.id , currentRouteObject.name , this.next.name )
	        	if( currentRouteObject.id != this.next.id || currentRouteObject.name != this.next.name )
	        	{

	        		//GA
	        		//console.log('GA :: send', 'pageview', {'page': State.url,'title': State.title} )
					ga('send', 'pageview', {'page': State.url,'title': State.title} );

	        		//console.log("page to load", page, "hide it ", SNR.Pages[ this.current.id ])
	        		SNR.Pages[ this.next.id ].init( this.next.id, this.next.name );
	        		SNR.Pages[ this.next.id ].bind( SNR.Pages[ this.next.id ].EVENT.VIEW_INIT, this.nextLoaded.bind(this) );
					SNR.Pages[ this.next.id ].load();
	        	}

	    	}
	    	else
	    	{
	    		//new
	    		this.current = { id : page.id, name : page.name };
	    	}
		},
		nextLoaded : function()
		{
			SNR.Pages[ this.next.id ].unbind( SNR.Pages[ this.next.id ].EVENT.VIEW_INIT, this.nextLoaded.bind(this) );

			//console.log("routemanager : hide the current one  " +this.current.id );

			SNR.Pages[ this.current.id ].bind( SNR.Pages[ this.current.id ].EVENT.HIDDEN, this.currentPageHidden.bind(this) );
		    SNR.Pages[ this.current.id ].hide();
		},
		currentPageHidden : function()
		{
			SNR.Pages[ this.current.id ].unbind( SNR.Pages[ this.current.id ].EVENT.HIDDEN, this.currentPageHidden.bind(this) );
			SNR.Pages[ this.current.id ].unload();

			//Show the next one
			//console.log("routemanager : show " +this.next.id );



			SNR.Pages[ this.next.id ].bind( SNR.Pages[ this.next.id ].EVENT.SHOWN, this.nextPageShow.bind(this) );
			SNR.Pages[ this.next.id ].show();

		},
		nextPageShow : function()
		{
			this.current = this.next; //new current

		},
	    getRoute : function(key, lang)
	    {
	    	var l = lang || SNR.conf.lang;

	    	for (var i in this.routes[l])
	    	{
	    		var route = this.routes[l][i];

	    		if(route.name == key)
	    			return route.url;
	    	}

	    	return null;
	    },
	    getCurrentRoute : function(State)
	    {

	    	for(var i in this.routes[SNR.conf.lang] )
	    	{
	    		
	    		if( State.url  == SNR.conf.baseUrl + this.routes[SNR.conf.lang][i].url )
	    		{
	    			return this.routes[SNR.conf.lang][i];
	    		}

	    		//sec...
	    		if( State.url  == SNR.conf.baseUrl + this.routes[SNR.conf.lang][i].url + "/")
	    		{
	    			return this.routes[SNR.conf.lang][i];
	    		}
	    	}

	    	return "index";
	    },
	    getCurrentRouteObject : function()
	    {

	    	for(var i in this.routes[SNR.conf.lang] )
	    	{
	    		var route = this.routes[SNR.conf.lang][i];

	    		if( route.id  == this.current.id && route.name  == this.current.name  )
	    		{
	    			return route ;
	    		}
	    	}
	    },
	    getCurrentPage : function()
	    {
	    	return SNR.pages[ this.current ];
	    },

	    
	};

	SNR.routeManager = new RouteManager();


})(jQuery);