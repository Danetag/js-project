JSP.Route = (function(window){

	function Route(){
		this.url  = null;
		this.name = null;
		this.id   = null;
		this.title= null;
		this.transition = null;
		this.theme = null;

		this.jSVar = null;
	};

	Route.prototype = {

		init : function(route)
		{
			
			this.id    		= route.id;
			this.url   		= route.url;
			this.name  		= route.name;
			this.title  	= route.title;
			this.transition = route.transition;
			this.theme 		= route.theme;

			this.jSVar      = route.jSVar;

		}
	}

	return Route;

})(window);