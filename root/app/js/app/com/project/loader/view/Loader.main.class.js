JSP.LoaderViews.Main = (function(window){

	function LoaderViewMain(){ JSP.LoaderView.call(this); }

    LoaderViewMain.prototype = Object.create(JSP.LoaderView.prototype);
	LoaderViewMain.prototype.constructor = LoaderViewMain;

	LoaderViewMain.prototype.el   = function()
	{
		this.html = '<div id="loader"></div>';
		this.$ = {
			loader : null
		};

		this.$.loader = $("#loader");

		if( this.$.loader[0] == undefined )
		{
			this.$.loader = $('<div id="loader"></div>');
			$("body").prepend( this.$.loader );
		}	
	};

	LoaderViewMain.prototype.show = function()
	{
		this.dispatch( this.EVENT.SHOWN );
	}

	LoaderViewMain.prototype.hide = function()
	{
		var self = this;
		TweenLite.to( this.$.loader, 0.3, { autoAlpha:0 , ease:Cubic.easeOut , onComplete: function(){ 
			self.dispatch( self.EVENT.HIDDEN );
		}});
	}

	LoaderViewMain.prototype.destroy = function()
	{
		this.$.loader.remove();
		this.$.loader = null;
		
		this.unbind();
		this.unbindEvents();
	}

	return LoaderViewMain;
 
})(window);