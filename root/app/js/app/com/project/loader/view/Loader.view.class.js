JSP.LoaderViews = {};

JSP.LoaderView = (function(window){

	function LoaderView()
	{
		JSP.EventDispatcher.call(this);

		this.EVENT    = {
			SHOWN    : "shown",
			HIDDEN   : "hidden"
		};
		this.$ = {

		};

		this.TL = {};

		this.html = "";
		this.nbItemsToLoad = 0;
		this.pct = 0;
	};

	LoaderView.prototype = Object.create(JSP.EventDispatcher.prototype);
	LoaderView.prototype.constructor = LoaderView;

	LoaderView.prototype.init = function(nbItems)
	{
		this.nbItemsToLoad = nbItems;

		this.el();
		this.append();
		this.bindEvents();
	}
	LoaderView.prototype.bindEvents = function()
	{

	}
	LoaderView.prototype.unbindEvents = function()
	{

	}
	LoaderView.prototype.el = function()
	{

	}
	LoaderView.prototype.append = function()
	{

	}
	LoaderView.prototype.setPct = function(pct) //to override
	{

	}
	LoaderView.prototype.show = function()
	{
		this.dispatch( this.EVENT.SHOWN );
	}
	LoaderView.prototype.hide = function()
	{
		this.unbind();
		this.unbindEvents();

		this.dispatch( this.EVENT.HIDDEN );
	}
	LoaderView.prototype.destroyTL = function()
	{
		for(var i=0; i < this.TL.length; i++ )
		{
			var tl = this.TL[i];

			if(tl == null)
				continue;

			tl.kill();
			tl.clear();
			tl = null;
		};

		this.TL = {};
	}
	LoaderView.prototype.destroy = function()
	{
		this.destroyTL();

		this.$.loader.remove();
		this.$.loader = null;
		
	}
	

	return LoaderView;
 
})(window);