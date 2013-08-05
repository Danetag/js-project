SNR.Loader = (function(window){

	function Loader(){

		this.aItems = [];
		this.index  = 0;

		this.$ = {
			garbage : null
		};
		this.events = {};

        this.EVENT = {
            STARTED    : "started",
            ENDED      : "ended",
            HIDDEN     : "hidden",
            DISPLAY    : "display",
            UNDISPLAY  : "undisplay"
        };

	    this.extensions = {
	        "image"   : ["jpg", "png"],
	        "video"   : ["mp4", "ogg"]
	    },
	    this.loaderView     = null;
	    this.loaderViewInit = false;

	    this.aKeyToItems = [];
	};

	Loader.prototype = {

		init   : function()
		{
			this.$.garbage = $('#loader-garbage');
			this.aItems = [];

			if( this.$.garbage[0] == undefined) //Just once. But maybe useless.
			{
				var div = document.createElement('div');
				div.setAttribute("id", "loader-garbage");
				div.style.position = "absolute";
				div.style.left = "-9999px";
				document.body.appendChild(div);
			}
			
		},
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
		destroy : function()
		{

		},
		add    : function(aItems) //{src : "/img/test.jpg", type : "image"}
		{

			//Convert Objects to SNR.LoaderType

			for(var i in aItems)
            {
                var oToLoad = aItems[i];

                var ext = oToLoad.src.split('.').pop();

                if(oToLoad.type == undefined)
                    oToLoad.type = _getType(ext);

                //create object
                var loadObject = null;

                switch(oToLoad.type)
                {
                    case "image" : loadObject = new SNR.LoaderTypes.Image();  break;
                    case "audio" : loadObject = new SNR.LoaderTypes.Audio();  break;
                    case "data"  : loadObject = new SNR.LoaderTypes.Data();  break;
                }

                loadObject.init.call(loadObject, oToLoad);

                this.aItems.push(loadObject);

                if(oToLoad.find != undefined)
                	loadObject.find = oToLoad.find;

                if(oToLoad.name != undefined)
                	this.aKeyToItems[oToLoad.name] = this.aItems.length - 1;
                else
                	this.aKeyToItems[oToLoad.src] = this.aItems.length - 1;

                
            }

		},

		initLoaderView : function()
		{
			if( this.loaderViewInit )
				return;

			this.loaderView.init.call( this.loaderView );
		},

		getData : function(key)
		{
			//get index
			var index = this.aKeyToItems[key];

			if( index != undefined)
				return this.aItems[index].data;

			return null;
		},

		/* BEGIN */
		
		start: function() 
	    { 
	    	this.dispatch( this.EVENT.STARTED );

	    	if( this.loaderView == null )
	    		this.loaderView = new SNR.LoaderViews.Main(); //basic

	    	this.initLoaderView();
	    	
	    	this.loaderView.bind.call( this.loaderView, this.loaderView.EVENT.SHOWN, this.loaderViewShown.bind(this) );

	    	//show LoaderView
	    	this.loaderView.show.call( this.loaderView ) ;
			
	    },
		    loaderViewShown : function()
		    {
		    	this.loaderView.unbind.call( this.loaderView, this.loaderView.EVENT.SHOWN, this.loaderViewShown.bind(this) );

		    	if( !this.aItems.length )
				{
					this.end();
					return;
				}	

				this.load();
		    },


	    /* LOAD */

	    load : function()
	    {
	    	var loaderObject = this.aItems[ this.index ];

	    	loaderObject.bind.call( loaderObject, loaderObject.EVENT.LOADED, this.loaded.bind(this, loaderObject) );

	    	//start loading
	    	loaderObject.load.call( loaderObject );

	    },
	    loaded : function(loaderObject)
	    {

	    	loaderObject.unbind.call( loaderObject, loaderObject.EVENT.LOADED, this.loaded.bind(this, loaderObject) );

	    	this.index++;

	    	if( this.index == this.aItems.length )
	    	{
				this.end();
				return;
			}

			this.load();
	    },

	    /* END */

	    end  : function()
	    {
	    	this.dispatch( this.EVENT.ENDED );
	    },


	    undisplay : function()
	    {

	    	//undisplay LoaderView
	    	this.loaderView.bind.call( this.loaderView, this.loaderView.EVENT.UNDISPLAY, this.loaderViewUndisplayed.bind(this) );
	    	this.loaderView.undisplay.call( this.loaderView ) ;
	    },
	    	loaderViewUndisplayed : function()
	    	{
	    		this.loaderView.unbind.call( this.loaderView, this.loaderView.EVENT.UNDISPLAY, this.loaderViewUndisplayed.bind(this) );
	    		
	    		this.dispatch( this.EVENT.UNDISPLAY );
	    	},

	    display : function()
	    {
	    	//display LoaderView
	    	this.loaderView.bind.call( this.loaderView, this.loaderView.EVENT.DISPLAY, this.loaderViewdisplayed.bind(this) );
	    	this.loaderView.display.call( this.loaderView ) ;
	    },
	    	loaderViewdisplayed : function()
	    	{
	    		this.loaderView.unbind.call( this.loaderView, this.loaderView.EVENT.DISPLAY, this.loaderViewdisplayed.bind(this) );

	    		this.dispatch( this.EVENT.DISPLAY );
	    	},


	    hide : function()
	    {
	    	this.loaderView.bind.call( this.loaderView, this.loaderView.EVENT.HIDDEN, this.loaderViewHidden.bind(this) );
	    	//hide LoaderView
	    	this.loaderView.hide.call( this.loaderView ) ;
	    },
		    loaderViewHidden : function()
		    {
		    	this.loaderView.unbind.call( this.loaderView, this.loaderView.EVENT.HIDDEN, this.loaderViewHidden.bind(this) );
		    	this.loaderView.destroy.call( this.loaderView );

		    	this.loaderView = null;

		    	this.dispatch( this.EVENT.HIDDEN );

		    }
	}

	var _getType = function(extension)
    {
        for(var type in _extensions)
        {
            var aExt = _extensions[type];

            for(var ext in aExt)
            {
                if( aExtp[ext] == extension )
                {
                    return type;
                }
            }

        }

        return "data";
    }

    return Loader;


})(jQuery);