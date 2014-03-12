JSP.LoaderViews = JSP.LoaderViews || {};

JSP.LoaderViews.Popup = (function(window){

	function LoaderViewPopup(){ JSP.LoaderView.call(this); }

    LoaderViewPopup.prototype = Object.create(JSP.LoaderView.prototype);
	LoaderViewPopup.prototype.constructor = LoaderViewPopup;

	LoaderViewPopup.prototype.el   = function()
	{
		this.pctFinished = false;
		this.canHide	 = false;

		this.html = '<div id="loader-popup"><span class="pct"><span class="bar"></span></span></div>';
		this.$ = {
			loader : null
		};

		this.$.loader = $(this.html);
		this.$.pct = this.$.loader.find(".pct");
		this.$.bar = this.$.loader.find(".bar");

		$("body").prepend( this.$.loader );
		
	};

	LoaderViewPopup.prototype.show = function()
	{
		var self = this;
		TweenLite.to( this.$.loader, 0.3, { autoAlpha:1 , ease:Cubic.easeOut , onComplete: function(){ 

			if(self.nbItemsToLoad)
			{
				TweenLite.to( self.$.pct, 0.3, { autoAlpha:1 , ease:Cubic.easeOut , onComplete: function(){ 
					self.dispatch( self.EVENT.SHOWN );
				}});
			}
			else
				self.dispatch( self.EVENT.SHOWN );
		}});
	}

	LoaderViewPopup.prototype.setPct = function(pct)
	{
		var self = this;	

		if(self.pct == 100)
			return;

		setTimeout(function(){

			TweenLite.to( { p : self.pct }, 0.3, { p:pct, onUpdateParams:["{self}"], ease:Expo.easeOut , onUpdate : function(tween){

	            var p = Math.floor(tween.target.p); 

	            self.$.bar.width( p + "%");

	            self.pct = p;

	        }, onComplete : function(){

	        	self.pct = pct; 

	        	if(self.pct === 100 && !self.pctFinished )
	        	{
	        		self.pctFinished = true;

	        		_hide.call(self);
	        	}

	        } });

		}, 0);

	}

	LoaderViewPopup.prototype.hide = function()
	{
		this.canHide = true;

		if(!this.nbItemsToLoad)
			this.pctFinished = true;

		_hide.call(this);
		
	}

	var _hide = function()
	{
		if( !this.canHide || !this.pctFinished )
			return;

		var self = this;
		TweenLite.to( this.$.loader, 0.3, { autoAlpha:0 , ease:Cubic.easeOut , onComplete: function(){ 
			self.dispatch( self.EVENT.HIDDEN );
		}});
	}

	return LoaderViewPopup;
 
})(window);