JSP.Route = (function(window){

	function Route(){
		this.url  = null;
		this.name = null;
	};

	Route.prototype = {
		init : function(route)
		{
			this.url   = route.url;
			this.name  = route.name;
		}
	}

	return Route;

})(window);