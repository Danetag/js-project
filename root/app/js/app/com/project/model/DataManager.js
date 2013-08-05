SNR.dataManager = {};

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
                var page = data.pages[name];

                if( name == "homepage")
                    continue;

                var name   = page[ SNR.conf.lang ].name;
                var url    = page[ SNR.conf.lang ].route;
                var assets = page[ SNR.conf.lang ].assets;

                var Model =  new SNR.Model();
                Model.init.call( Model, name, url, assets );

                this.add(page.id, Model);
            }

        },
        find : function(key, name)
        {
            if( this.collections.hasOwnProperty(key) )
                return this.collections[key][name];
            else
                return null;
        },
        add : function(key, Model)
        {
            if( !this.collections.hasOwnProperty(key) )
            {
                this.collections[key] = [];
                
            }
            this.collections[key][Model.name] = Model;

        },
        remove : function(key)
        {
            if( this.collections.hasOwnProperty(key) )
                delete this.collections[key];
        }
	    
	};

    SNR.dataManager = new dataManager();

})(jQuery);