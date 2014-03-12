JSP.LoaderViews = JSP.LoaderViews || {};

JSP.LoaderViews.Basic = (function(window){

	function LoaderViewBasic(){ JSP.LoaderView.call(this); }

    LoaderViewBasic.prototype = Object.create(JSP.LoaderView.prototype);
	LoaderViewBasic.prototype.constructor = LoaderViewBasic;

	LoaderViewBasic.prototype.el   = function()
	{
		this.html = '<div id="loader-basic"><span class="spinner"></span></div>';
		this.$ = {
			loader : null
		};

		this.$.loader = $(this.html);

		$("body").prepend( this.$.loader );
		
	};

	LoaderViewBasic.prototype.show = function()
	{
		var self = this;

		setTimeout(function(){

			TweenLite.to( self.$.loader, 0.7, { autoAlpha:1 , ease:Cubic.easeOut , onComplete: function(){ 
				self.dispatch( self.EVENT.SHOWN );
			}});
			
		}, 0)


	}

	LoaderViewBasic.prototype.hide = function()
	{
		var self = this;

		setTimeout(function(){

			TweenLite.to( self.$.loader, 0.7, { autoAlpha:0 , ease:Cubic.easeOut , onComplete: function(){ 
				self.dispatch( self.EVENT.HIDDEN );
			}});

		}, 0)
	}

	return LoaderViewBasic;
 
})(window);