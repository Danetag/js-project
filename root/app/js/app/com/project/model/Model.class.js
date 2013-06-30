JSP.Model = (function(window){

	function Model(){
		this._data  = {};
		this.length = 0;
		this.events   = {};
		this.EVENT    = {
			RESET    : "reset"
		};
		this.url = "";
		this.assets = [];
	};

	Model.prototype = {
		init : function(url, assets)
		{
			this.reset();
			this.url    = url;
			this.assets = assets;
		},
		bind : function(name, f)
		{
			this.events[name] = new signals.Signal();
			this.events[name].add(f);
		},
		unbind : function(name, f)
		{
			this.events[name].remove(f);
		},
		dispatch : function(name)
		{
			if( this.events[name] == undefined ) // Only if the event is registred
				return;

			this.events[name].dispatch();
		},
		get : function(key)
		{
			return this._data[key];
		},
		set : function(key, value)
		{
			var self = this;

			if(arguments.length == 1 && key === Object(key)) {
				Object.keys(attr).forEach(function(key) {
					self.set(key, attr[key]);
				});
				return;
			}

			if(!this._data.hasOwnProperty(key)) {
				this.length++;
			}

			this._data[key] = (typeof value == 'undefined' ? true : value);
		},
		has : function(key)
		{
			return this._data.hasOwnProperty(key);
		},
		remove : function(key)
		{
			this._data.hasOwnProperty(key) && this.length--;
  			delete this._data[key];
		},
		json : function()
		{
			return JSON.stringify(this._data);
		},
		reset : function()
		{
			this._data = {};
			this.length = 0;
			this.dispatch( this.EVENT.RESET );
		}
	}

	return Model;

})(window);