NS.LoaderViews.Card = (function(window){

	function LoaderViewCard(){ NS.LoaderView.call(this); }

    LoaderViewCard.prototype = Object.create(NS.LoaderView.prototype);
	LoaderViewCard.prototype.constructor = LoaderViewCard;

	LoaderViewCard.prototype.el   = function()
	{
		this.html = '<div id="loader-card"><span class="icon-spinner"></span></div>';
		this.$ = {
			loader : null
		};

		this.$.loader = $(this.html);

		$("body").prepend( this.$.loader );
		
	};

	LoaderViewCard.prototype.show = function()
	{
		var self = this;
		TweenLite.to( this.$.loader, 0.3, { autoAlpha:1 , ease:Cubic.easeOut , onComplete: function(){ 
			self.dispatch( self.EVENT.SHOWN );
		}});
	}

	LoaderViewCard.prototype.hide = function()
	{
		var self = this;
		TweenLite.to( this.$.loader, 0.3, { autoAlpha:0 , ease:Cubic.easeOut , onComplete: function(){ 
			self.dispatch( self.EVENT.HIDDEN );
		}});
	}

	LoaderViewCard.prototype.destroy = function()
	{
		this.$.loader.remove();
		this.$.loader = null;
		
		this.unbind();
		this.unbindEvents();
	}

	return LoaderViewCard;
 
})(window);