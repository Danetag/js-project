SNR.Route = (function(window){

	function Route(){
		this.url  = null;
		this.name = null;
		this.id   = null;
	};

	Route.prototype = {

		init : function(route)
		{
			
			this.id    = route.id;
			this.url   = route.url;
			this.name  = route.name;

		}
	}

	return Route;

})(window);