JSP.EventDispatcher = JSP.EventDispatcher || {};

JSP.EventDispatcher = (function(window){

	var EventDispatcher = function (){
		this.events = {};
		this.EVENT  = {};
	};

	EventDispatcher.prototype = 
	{
		bind : function(name, f)
		{
			this.events[name] = new signals.Signal();
			this.events[name].add(f);
		},
		unbind : function(name, f)
		{
			if(f != undefined)
			{
				this.events[name].remove(f);
				delete this.events[name];
			}	
			else if( name != undefined)
			{
				this.events[name].removeAll();
				delete this.events[name];
			}	
			else
			{
				for(var name in this.events)
				{
					this.unbind(name);
				}
			}
		},
		dispatch : function(name, params)
		{
			if( this.events[name] == undefined ) // Only if the event is registred
				return;

			if(params != undefined)
				this.events[name].dispatch(params);
			else
				this.events[name].dispatch();
		}
	}

	return EventDispatcher;
 
})(window);