JSP.Loader = (function(window){

	function Loader(){

		JSP.EventDispatcher.call(this);

		this.queue  = null;
		this.aItems = [];

		this.onFileLoadProxy  = null;
		this.onFileStartProxy = null;
		this.onLoadStartProxy = null;
		this.onCompleteProxy  = null;
		this.onProgressProxy  = null;
		this.onErrorProxy     = null;

        this.EVENT = {
            STARTED    : "started",
            ENDED      : "ended",
            HIDDEN     : "hidden",
            DISPLAY    : "display",
            UNDISPLAY  : "undisplay",
            SHOWN      : "shown"
        };

	    this.loaderView     = null;
	    this.loaderViewInit = false;

	};

	Loader.prototype = Object.create(JSP.EventDispatcher.prototype);
	Loader.prototype.constructor = Loader;

	Loader.prototype.init   = function()
	{
		this.aItems = [];	
		this.queue  = new createjs.LoadQueue(true, JSP.conf.baseUrl);
		this.queue.installPlugin(createjs.Sound);

		this.bindEvents();
	
	}
	Loader.prototype.bindEvents = function ()
	{
		this.onFileLoadProxy = $.proxy(this.onFileLoad, this);
		this.queue.addEventListener('fileload', this.onFileLoadProxy);

		this.onFileStartProxy = $.proxy(this.onFileStart, this);
		this.queue.addEventListener('filestart', this.onFileStartProxy);

		this.onLoadStartProxy = $.proxy(this.onLoadStart, this);
		this.queue.addEventListener('loadstart', this.onLoadStartProxy);

		this.onCompleteProxy = $.proxy(this.onComplete, this);
		this.queue.addEventListener('complete', this.onCompleteProxy);

		this.onProgressProxy = $.proxy(this.onProgress, this);
		this.queue.addEventListener('progress', this.onProgressProxy);

		this.onErrorProxy = $.proxy(this.onError, this);
		this.queue.addEventListener('error', this.onErrorProxy);

	}
	Loader.prototype.unbindEvents = function ()
	{
		this.queue.removeAllEventListeners();
	}

	Loader.prototype.add    = function(aItems) // http://www.createjs.com/Docs/PreloadJS/classes/LoadQueue.html#method_loadManifest
	{
		if(aItems == undefined)
			return;

		for(var i = 0; i < aItems.length; i++)
		{
			if( aItems[i].src.indexOf(".mp3") > -1 && !JSP.conf.hasAudio)
			{
				//console.log("ITEM DELETE :: ", aItems[i].src)
				continue;
			}	

			if( aItems[i].src.indexOf("http://") < 0 && aItems[i].src.indexOf("https://") < 0 )
			{
				//console.log("--base ", aItems[i].src)
				aItems[i].src = JSP.conf.baseUrl + aItems[i].src;
			}	

			if( ! JSP.AssetsManager.find( aItems[i] ) )
			{
				//JSP.console.log("added to the loader : ", aItems[i].id, ", src : ", aItems[i].src)
				this.aItems.push(aItems[i]);
			}	
		}	

	}

	Loader.prototype.getData = function(key, raw)
	{
		var r = raw || false;
		return this.queue.getResult(key, r);
	}

	/* BEGIN */
	
	Loader.prototype.start= function() 
    { 
    	this.dispatch( this.EVENT.STARTED );

    	if( this.loaderView == null )
    	{
    		this.loaderView = new JSP.LoaderViews.Basic(); //basic
    	}	

    	this.initLoaderView();
    	
    	this.loaderView.bind.call( this.loaderView, this.loaderView.EVENT.SHOWN, this.loaderViewShown.bind(this) );

    	//show LoaderView
    	this.loaderView.show.call( this.loaderView ) ;
		
    }

    /* LOAD */

    Loader.prototype.onFileStart = function(e)
    {
    	//JSP.console.log("onFileStart > id :: "+ e.item.id + ",  src :: "+ e.item.src);
    }

    Loader.prototype.onLoadStart = function(e)
    {
    	////JSP.console.log("--onLoadStart");
    }

    Loader.prototype.onFileLoad = function(e)
	{
		////JSP.console.log("Loaded :: ", e.item.src )
		JSP.AssetsManager.add( { result : e.result, raw : e.rawResult, id : e.item.id, src : e.item.src } );
	}

	Loader.prototype.onError = function(e)
	{
		//JSP.console.log("ERROR LOADING id :: "+ e.item.id + ",  src :: "+ e.item.src + ", error :: "+e.error);
		JSP.AssetsManager.add( { result : null, raw : null, id : e.item.id, src : e.item.src } ); //add anyway to get the reference <-> src
	}

	Loader.prototype.onProgress = function(e)
	{
		////JSP.console.log( Math.round(e.progress * 100 ) )
		this.loaderView.setPct.call(this.loaderView, Math.round(e.progress * 100 ) );
	}

    /* END */

    Loader.prototype.onComplete = function()
	{
		this.aItems.length = 0;
		this.dispatch( this.EVENT.ENDED );
	}

	/* LOADER VIEW */

	Loader.prototype.initLoaderView = function()
	{
		if( this.loaderViewInit )
			return;

		this.loaderView.init.call( this.loaderView, this.aItems.length );
	}

		Loader.prototype.loaderViewShown = function()
	    {
	    	this.loaderView.unbind.call( this.loaderView, this.loaderView.EVENT.SHOWN, this.loaderViewShown.bind(this) );

	    	//view showed !
	    	this.dispatch(this.EVENT.SHOWN);

	    	////JSP.console.log("loaderViewShown :: ", this.aItems.length )

	    	if( !this.aItems.length )
			{
				this.onComplete();
				return;
			}	
			
			/*
			for(var i = 0; i < this.aItems.length; i++)
			{
				//JSP.console.log("in loader :: "+ this.aItems[i].id + ", src :: " + this.aItems[i].src )
			}
			*/
			
			

			//this.aItems[1].src = "/img/scenes/scene01/anims/flacon/sprite01.png";

			
			this.queue.loadTimeout = 999999; // Time in milliseconds to assume a load has failed.
			this.queue.loadManifest(this.aItems);
			//this.queue.load();

	    }

    Loader.prototype.undisplay = function()
    {

    	//undisplay LoaderView
    	this.loaderView.bind.call( this.loaderView, this.loaderView.EVENT.UNDISPLAY, this.loaderViewUndisplayed.bind(this) );
    	this.loaderView.undisplay.call( this.loaderView ) ;
    }
    	Loader.prototype.loaderViewUndisplayed = function()
    	{
    		this.loaderView.unbind.call( this.loaderView, this.loaderView.EVENT.UNDISPLAY, this.loaderViewUndisplayed.bind(this) );
    		this.dispatch( this.EVENT.UNDISPLAY );
    	}

    Loader.prototype.display = function()
    {
    	//display LoaderView
    	this.loaderView.bind.call( this.loaderView, this.loaderView.EVENT.DISPLAY, this.loaderViewdisplayed.bind(this) );
    	this.loaderView.display.call( this.loaderView ) ;
    }

    	Loader.prototype.loaderViewdisplayed = function()
    	{
    		this.loaderView.unbind.call( this.loaderView, this.loaderView.EVENT.DISPLAY, this.loaderViewdisplayed.bind(this) );

    		this.dispatch( this.EVENT.DISPLAY );
    	}


    Loader.prototype.hide = function()
    {
    	this.loaderView.bind.call( this.loaderView, this.loaderView.EVENT.HIDDEN, this.loaderViewHidden.bind(this) );
    	//hide LoaderView
    	this.loaderView.hide.call( this.loaderView ) ;
    }

	    Loader.prototype.loaderViewHidden = function()
	    {
	    	this.loaderView.unbind.call( this.loaderView, this.loaderView.EVENT.HIDDEN, this.loaderViewHidden.bind(this) );
	    	this.loaderView.destroy.call( this.loaderView );

	    	this.loaderView = null;

	    	this.dispatch( this.EVENT.HIDDEN );

	    }
	
	Loader.prototype.destroy = function()
	{
		this.unbindEvents();
		this.queue = null;
	}
	

    return Loader;


})(window);