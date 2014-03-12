JSP.Route = (function(window){

	function Route(){
		this.url       = null;
		this.urlHashed = null;
		this.name      = null;
		this.id  	   = null;
		this.title	   = null;

		this.jSVar 	   = null;
		this.bodyClass = null;
		this.popupClass = null;
		this.isPopup   = false;
	};

	Route.prototype = {

		init : function(route)
		{
			
			this.id    		= route.id;
			this.url   		= route.url;
			this.name  		= route.name;
			this.title  	= route.title;

			this.bodyClass  = route.bodyClass;
			this.popupClass = route.popupClass;
			this.jSVar      = route.jSVar;

			this.urlHashed  = JSP.helpers.Url.addHash( this.url );
			//_initUrlHashed.call(this);

		}
	}

	return Route;

})(window);