JSP.Route = (function(window){

	function Route(){};

	Route.prototype = {
		url  : null,
		name : null,
		init : function(route)
		{
			this.url   = route.url;
			this.name  = route.name;
		}
	}

	return Route;

})(window);