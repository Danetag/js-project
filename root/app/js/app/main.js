
/* OK Let's go */

JSP.main = {};

(function($){

	var Main = function(){};

	var _Loader = null;

	Main.prototype = {

		onReady : function()
		{
			console.log("------------ ON READY ------------");

			var self = this;

			_Loader = new JSP.Loader();
			_Loader.loaderView = new JSP.LoaderViews.Main();
			
			_Loader.initLoaderView();

			$.getJSON( JSP.conf.baseUrl + "/data/pages.json", null, function(data, textStatus, jqXHR){
				self.loaded(data);
			});

		},

		loaded : function(data)
		{
			//Data Manager
			JSP.dataManager.init(data);

			//Route
			JSP.routeManager.init(data);

			//Start
			JSP.Pages.main.init();
		},

		start : function()
		{

			JSP.routeManager.unbind( JSP.routeManager.EVENT.LOADED, this.start.bind(this) );

			JSP.pages.main.init();

			//test
			/*
			var loader = new JSP.Loader();
			
			loader.init.call(loader);
			loader.add.call(loader, [{ src: "/img/sprite.png", type:"image" }]);
			loader.bind.call(loader, loader.EVENT.ENDED, JSP.main.loaded);

			loader.start.call(loader);
			*/


		}
	}

	JSP.main = new Main();

	//return new Main();	

})(jQuery);


//JSP["main"] = JSP.main;
//JSP.main["onReady"] = JSP.main.onReady;


//LET GO
$(document).ready( JSP.main.onReady.bind(JSP.main) );
		




