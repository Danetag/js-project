SNR.LoaderTypes = {};

SNR.LoaderType = (function(window){

	function LoaderType(){
		this.src      = null;
		this.$garbage = null;
		this.events   = {};
		this.data     = null;
		this.EVENT    = {
			STARTED   : "started",
			LOADED    : "loaded"
		}
		this.filter   = "#content";
		this.find     = "";

	};

	LoaderType.prototype = 
	{
		init : function(o)
		{
			this.src = o.src;
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