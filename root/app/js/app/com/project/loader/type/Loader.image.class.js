JSP.LoaderTypes.Image = (function(window){

    function LoaderImage(){ JSP.LoaderType.call(this); }

    LoaderImage.prototype = Object.create(JSP.LoaderType.prototype);
	LoaderImage.prototype.constructor = LoaderImage;

    //Public override

    LoaderImage.prototype.load = function(){   

    	var self = this;
		var image = new Image();

		image.src = this.src;	

		if (image.complete || image.naturalWidth > 0)
		{
			this.dispatch( this.EVENT.LOADED );
		}
		else
		{
			$img = $(image)

			$img.load(function()
			{
				self.data = $img;
				self.dispatch( self.EVENT.LOADED );
									
			}).error(function()
			{
				console.log("Loader.Image:Error " + image.src);
				
				self.dispatch( self.EVENT.LOADED );
			});

			$img.attr("src", image.src);
		}

	};
    
	// PUBLIC
	return LoaderImage;

})(window);
