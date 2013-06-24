JSP.LoaderTypes = {};

JSP.LoaderType = (function(window){

	function LoaderType(){};

	LoaderType.prototype = 
	{
		src      : null,
		$garbage : null,
		events   : {},
		data     : null,
		EVENT    : {
			STARTED   : "started",
			LOADED    : "loaded"
		},
		init : function(src)
		{
			this.src = src;
		},
		bind : function(name, f)
		{
			this.events[name] = new signals.Signal();
			this.events[name].add(f);
		},
		unbind : function(name, f)
		{
			if(f != undefined)
				this.events[name].remove(f);
			else
				this.events[name].removeAll();
		},
		dispatch : function(name)
		{
			if( this.events[name] == undefined ) // Only if the event is registred
				return;

			this.events[name].dispatch();

		},
		load : function(){}, //to override
		destroy : function()
		{
			for(var name in this.events)
			{
				this.events[name].removeAll();
			}

			this.data = null;
		}
	}

	return LoaderType;
 
})(window);