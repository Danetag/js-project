
JSP.helpers = JSP.helpers || {}

JSP.helpers.BackgroundSize = (function(window){

   function BackgroundSize($container, img){

   		this.backgroundsizable = Modernizr.backgroundsize;

	   	this.$ = {
	   		container : $container,
	   		img 	  : null
	   	}

		this.wdw = {
			width  : 0,
			height : 0
		};

		this.img = img;
		this.imgRatio = 1;

		this.onWindowResizeProxy = null;

    };
    
	// PUBLIC
	BackgroundSize.prototype = 
    {
		init : function()
	    {
	    	
	    	if( this.backgroundsizable ) //no need !
	    		return;

	    	this.el();
	    	this.onResize();
            this.bindEvents();
	    },
		el : function()
		{
			this.$.img = $('<img class="background" src="'+ this.img.src +'" />');
			this.$.container.prepend(this.$.img);

			this.imgRatio = parseInt(this.$.img.height(), 10) / parseInt(this.$.img.width(), 10);

		},
	    bindEvents : function()
	    {
	    	this.onWindowResizeProxy = $.proxy(this.onResize, this);
        	window.addEventListener('resize', this.onWindowResizeProxy);    
	    },
	    unbindEvents : function()
	    {
	    	window.removeEventListener('resize', this.onWindowResizeProxy);  
	    	this.onWindowResizeProxy = null;  
	    },
		onResize : function(e)
		{
			this.wdw.height = $(window).height();
			this.wdw.width  = $(window).width();

			JSP.helpers.Positionr.fullscreen({ 
				el 			: this.$.img, 
				width  		: this.wdw.width, 
				height 		: this.wdw.height, 
				ratio  		: this.imgRatio, 
				resizeTop 	: true, 
				resizeLeft 	: true 
			})
		},
		destroy : function()
		{
			if( this.backgroundsizable ) //no need !
	    		return;

			this.unbindEvents();

			this.$ = {};
		}
		
	};

    return BackgroundSize;

})(window);