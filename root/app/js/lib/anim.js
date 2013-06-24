var ANIM =  ANIM || {};

ANIM = (function(){

    var has3d = false,
    	transformProperty = false,
    	transitionsEndProperty = false,
    	transformProperties = {
            'webkitTransform':'-webkit-transform',
            'OTransform':'-o-transform',
            'msTransform':'-ms-transform',
            'MozTransform':'-moz-transform',
            'transform':'transform'
        },
        transitionsEnd = {
	      'transition':'transitionend',
	      'OTransition':'oTransitionEnd',
	      'MozTransition':'transitionend',
	      'WebkitTransition':'webkitTransitionEnd'
	    };

	var _init = function()
	{
		var h3d = undefined,
			el  = document.createElement('p');

		document.body.insertBefore(el, null);

		//transform properties
		for (var t in transformProperties) 
		{
	        if (el.style[t] !== undefined) 
	        {
	            el.style[t] = "translate3d(1px,1px,1px)";
	            transformProperty = t;
	            h3d = window.getComputedStyle(el).getPropertyValue(transformProperties[t]);
	        }
	    }

	    //transiton end
	    for(var t in transitionsEnd){
	        if( el.style[t] !== undefined ){
	            transitionsEndProperty = transitionsEnd[t];
	        }
	    }

	    document.body.removeChild(el);

	    has3d = (h3d !== undefined && h3d.length > 0 && h3d !== "none");
	}


	_init();

	return {

		getTransformProperty : function() { return transformProperty; },
		
		getTranslateProperty : function(x, y, z, no3D)
		{
			var x = x || 0,
				y = y || 0,
				z = z || 0,
				no3D = no3D || false;

			if(has3d && !no3D)
				return 'translate3d('+ x +'px, '+ y +'px, '+ z +'px)';
			else
				return 'translate('+ x +'px, '+ y +'px)';
		},

		transition : function(o){
			var $el = o.$el;
			var oTransit = o.transit;

			if( !Modernizr.csstransforms )
			{
				if(oTransit.y != undefined)
					oTransit.top = oTransit.y;

				if(oTransit.x != undefined)
					oTransit.left = oTransit.y;
			}

			$el.transition(oTransit);
		},

		has3D : function(){ return has3d; }

	}
})();

window["requestAnimFrame"] = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
