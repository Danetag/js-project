
/* OK Let's go */

NS.main = {};

(function($){

	var Main = function(){};

	var _Loader = null;

	Main.prototype = {

		onReady : function()
		{
			console.log("------------ ON READY ------------");

			var self = this;

			_Loader = new NS.Loader();
			_Loader.loaderView = new NS.LoaderViews.Main();
			
			_Loader.initLoaderView();

			$.getJSON( NS.conf.baseUrl + "/data/pages.json", null, function(data, textStatus, jqXHR){
				self.loaded(data);
			});

		},

		loaded : function(data)
		{
			//Data Manager
			NS.dataManager.init(data);

			//Route
			NS.routeManager.init(data);

			//Start
			NS.Pages.main.init();
		},

		start : function()
		{

			NS.routeManager.unbind( NS.routeManager.EVENT.LOADED, this.start.bind(this) );

			NS.pages.main.init();

			//test
			/*
			var loader = new NS.Loader();
			
			loader.init.call(loader);
			loader.add.call(loader, [{ src: "/img/sprite.png", type:"image" }]);
			loader.bind.call(loader, loader.EVENT.ENDED, NS.main.loaded);

			loader.start.call(loader);
			*/


		}
	}

	NS.main = new Main();

	//return new Main();	

})(jQuery);


//NS["main"] = NS.main;
//NS.main["onReady"] = NS.main.onReady;


//LET GO
$(document).ready( NS.main.onReady.bind(NS.main) );
		




