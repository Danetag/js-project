JSP.routeManager = {};

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

	    		for(var lang in page)
	    		{
	    			if(this.routes[lang] == undefined)
	    				this.routes[lang] = []; //first

	    			var routeOject =  new JSP.Route();
	    			routeOject.init.call( routeOject, { url : page[lang], name : name }  );

	    			this.routes[lang].push ( routeOject );
	    		}
	    	}

	    },
	    onStateChange : function(){
		
			var State = History.getState(); // Note: We are using History.getState() instead of event.state
	        History.log(State.data, State.title, State.url);

	        var page = this.getCurrentRoute(State);

	        //hide if not new
	        if(this.current != null && this.current != page )
	        {
		        JSP.Pages[ this.current ].bind( JSP.Pages[ this.current ].EVENT.HIDDEN, this.currentPageHidden.bind(this, page) );
		        JSP.Pages[ this.current ].hide();
	    	}
	    	else
	    	{
	    		//new
	    		this.current = page;
	    	}
		},
		currentPageHidden : function(page)
		{
			JSP.Pages[ this.current ].unbind( JSP.Pages[ this.current ].EVENT.HIDDEN, this.currentPageHidden.bind(this) );
			JSP.Pages[ this.current ].unload();

			this.current = page; //new current

			JSP.Pages[ this.current ].init( this.current );
			JSP.Pages[ this.current ].load();

		},
	    getRoute : function(key, lang)
	    {
	    	var l = lang || JSP.conf.lang;

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
	    	for(var i in this.routes[JSP.conf.lang] )
	    	{
	    		if( State.url  == JSP.conf.baseUrl + this.routes[JSP.conf.lang][i].url )
	    		{
	    			return this.routes[JSP.conf.lang][i].name ;
	    		}
	    	}

	    	return "index";
	    },
	    getCurrentPage : function()
	    {
	    	return JSP.pages[ this.current ];
	    }
	    
	};

	JSP.routeManager = new RouteManager();


})(jQuery);