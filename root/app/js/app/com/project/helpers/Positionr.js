
JSP.helpers = JSP.helpers || {}

JSP.helpers.Positionr = {};

(function(window){

   	function Positionr(){};
    
	// PUBLIC
	Positionr.prototype = 
    {
		fullscreen : function(o)
		{
			var $el = o.el,
				w   = o.width,
				h   = o.height,
				ratio = o.ratio,
				resizeTop = o.resizeTop   || false,
				resizeLeft = o.resizeLeft || false,
				top   = 0,
				left  = 0;

			//var elW = $el.width(),
			//	elH = $el.height();

			var css = this.calcFullscreen({
				w : w,
				h : h,
				ratio : ratio,
				resizeTop : resizeTop,
				resizeLeft : resizeLeft
			})

			////JSP.console.log("css width :: ", css.width)

			$el.css(css);

		},
		calcFullscreen : function(o)
		{
			o.left = 0;
			o.top = 0;

			o.elW = o.w;
			o.elH = o.elW * o.ratio;

			if( o.elH < o.h)
			{
				o.elH = o.h;
				o.elW = o.elH / o.ratio;
			}
			else if ( o.elH > o.h )
			{
				if( o.resizeTop )
				{
					o.top = - ( o.elH - o.h ) / 2;
				}	
				else if( o.resizeBottom != undefined )
				{
					if( o.resizeBottom )
					{
						o.top = - ( o.elH - o.h );
					}
				}
					
			}

			if( o.elW <  o.w)
			{
				o.elW = o.w;
				o.elH = o.elW * o.ratio;
			}
			else if ( o.elW > o.w )
			{
				if( o.resizeLeft )
				{
					o.left = - ( ( o.elW - o.w ) / 2 )
				}
				else
				{
					if( o.resizeRight )
					{
						//console.log("resizeBottom")
						o.left = - ( o.elW - o.w );
					}
				}
			}

			return { height : o.elH, width : o.elW, top : o.top, left : o.left };
		},
		valignCenter : function(o)
		{
			var $el = o.el,
				h   = o.height;

			var elH = $el.height();

			$el.css({ top : ( h - elH ) / 2 });

		},
		scale : function(o)
		{
			var $el 			= o.el,
				wWIndow  		= o.wWIndow,
				hWindow  		= o.hWindow,
				ratioW 			= o.ratioW,
				ratioH 			= o.ratioH;

			var elW = wWIndow * ratioW;
			var elH = wWIndow * ratioH;

			$el.css({ height : elH, width : elW, top : top, left : left });


			//doit être à 29% top;
			//var ratioW = o.width / o.elW;

		}	
		
	};

    
	JSP.helpers.Positionr = new Positionr();

})(window);
