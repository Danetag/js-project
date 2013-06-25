JSP.Loader = (function(window){

	function Loader(){};

	Loader.prototype = {

		aItems : [],
		index  : 0,
		$:{
			garbage : null
		},
		events : {},

        EVENT : {
            STARTED : "started",
            ENDED   : "ended",
            HIDDEN  : "hidden"
        },

	    extensions : {
	        "image"   : ["jpg", "png"],
	        "video"   : ["mp4", "ogg"]
	    },
	    loaderView : null,
	    loaderViewInit : false,

		init   : function()
		{
			this.$.garbage = $('#loader-garbage');
			this.aItems = [];

			if( this.$.garbage[0] == undefined) //Just once. But maybe useless.
			{
				var div = document.createElement('div');
				div.setAttribute("id", "image-garbage");
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
			this.events[name].remove(f);
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

			//Convert Objects to JSP.LoaderType

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
                    case "image" : loadObject = new JSP.LoaderTypes.Image();  break;
                    case "data"  : loadObject = new JSP.LoaderTypes.Data();  break;
                }

                loadObject.init.call(loadObject, oToLoad.src);

                this.aItems.push(loadObject);
                
            }

		},

		initLoaderView : function()
		{
			if( this.loaderViewInit )
				return;

			this.loaderView.init.call( this.loaderView );
		},

		/* BEGIN */
		start: function() 
	    { 
	    	this.dispatch( this.EVENT.STARTED );

	    	if( this.loaderView == null )
	    		this.loaderView = new JSP.LoaderViews.Main(); //basic

	    	this.initLoaderView();
	    	
	    	this.loaderView.bind.call( this.loaderView, this.loaderView.EVENT.SHOWN, this.loaderViewShown.bind(this) );

	    	//show LoaderView
	    	this.loaderView.show.call( this.loaderView ) ;
			
	    },
		    loaderViewShown : function()
		    {
		    	this.loaderView.unbind.call( this.loaderView, this.loaderView.EVENT.SHOWN, this.loaderViewShown.bind(this) );

		    	if( !this.aItems )
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