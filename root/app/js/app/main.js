
/* OK Let's go */

JSP.main = {};

(function($){

	var Main = function(){

		this.queue = null;
		this.onCompleteProxy = null;
		this.onFileLoadProxy = null;

	};

	var _Loader = null;

	Main.prototype = {

		onReady : function()
		{
			JSP.console.log("------------ ON READY ------------");

			var self = this;

			//conf
			this.initConf();

			// Loading
			_Loader = new JSP.Loader();
			_Loader.loaderView = new JSP.LoaderViews.Main();
			_Loader.initLoaderView();

			// preload js for the json 
			this.loadJson();
		},

		loadJson : function()
		{
			this.queue  = new createjs.LoadQueue(true, JSP.conf.baseUrl);

			this.onCompleteProxy = $.proxy(this.onComplete, this);
			this.queue.addEventListener('complete', this.onCompleteProxy);

			this.onFileLoadProxy = $.proxy(this.onFileLoad, this);
			this.queue.addEventListener('fileload', this.onFileLoadProxy);

			var baseUrl = JSP.conf.baseUrl;

			this.queue.loadManifest([{ src: baseUrl + "/data/pages.json" , id:"page_json" }]);
			this.queue.load();
		},

		onComplete : function()
		{
			this.queue 			 = null;
			this.onCompleteProxy = null;
			this.onFileLoadProxy = null;
		},

		onFileLoad : function(e)
		{
			this.loaded(e.result);
		},

		loaded : function(data)
		{
			//Data Manager
			JSP.dataManager.init(data);

			//Assets Manager
			JSP.AssetsManager.init();

			//Route
			JSP.routeManager.init(data);

			//Sound
			JSP.SoundManager.init();

			//Start
			if( JSP.conf.hasPushState )
				JSP.Pages.main.init();
		},

		start : function()
		{

			JSP.routeManager.unbind( JSP.routeManager.EVENT.LOADED, this.start.bind(this) );

			JSP.pages.main.init();

		},

		initConf : function()
		{
			JSP.conf.hasAudio = Modernizr.audio;

			if( $('html').is('.ie6, .ie7, .ie8, .ie9, .ie10') )
			{
				JSP.conf.isIE = true;
			}

			//ultime test ie 11
			if( _isIE.call(this) )
			{
				JSP.conf.isIE = true;
				document.documentElement.className ="is-ie " + document.documentElement.className;
			}

		}
	}

	var _isIE = function() { 
		return ((navigator.appName == 'Microsoft Internet Explorer') || ((navigator.appName == 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null))); 
	}

	JSP.main = new Main();

})(jQuery);


		




