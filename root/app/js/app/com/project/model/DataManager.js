JSP.dataManager = {};

(function($){

    var dataManager = function(){};
    
	// PUBLIC
	dataManager.prototype = {
        collections : {},
        primaryAssets : [],
		init : function(data)
	    {
            //Assets
            this.primaryAssets = data.primaryAssets;

	    	this.initModels(data);
	    },
	    bindEvents : function()
	    {
	    	
	    },
	    unbindEvents : function()
	    {

	    },
        initModels : function(data)
        {
            for(var name in data.pages)
            {
                var url    = data.pages[name][ JSP.conf.lang ].route;
                var assets = data.pages[name][ JSP.conf.lang ].assets;

                var Model =  new JSP.Model();
                Model.init.call( Model, url, assets );

                this.add(name, Model);
            }
        },
        find : function(key)
        {
            if( this.collections.hasOwnProperty(key) )
                return this.collections[key];
            else
                return null;
        },
        add : function(key, Model)
        {
            if( !this.collections.hasOwnProperty(key) )
            {
                this.collections[key] = Model;
            }   
        },
        remove : function(key)
        {
            if( this.collections.hasOwnProperty(key) )
                delete this.collections[key];
        }
	    
	};

    JSP.dataManager = new dataManager();

})(jQuery);