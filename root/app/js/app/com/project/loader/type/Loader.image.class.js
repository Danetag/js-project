SNR.LoaderTypes.Image = (function(window){

    function LoaderImage(){ SNR.LoaderType.call(this); }

    LoaderImage.prototype = Object.create(SNR.LoaderType.prototype);
	LoaderImage.prototype.constructor = LoaderImage;

    //Public override

    LoaderImage.prototype.load = function(){   

    	var self = this;

		var $img = $('<img>').attr('src', this.src);

		if ($img[0].complete || $img[0].naturalWidth > 0)
		{
			self.data = $img;
			this.dispatch( this.EVENT.LOADED );
		}
		else
		{

			$img.load(function()
			{
				if(self.data == null)
				{
					self.data = $(this);
					self.dispatch( self.EVENT.LOADED );
				}
				else
					self.data = $(this);
									
			}).error(function()
			{
				console.log("Loader.Image:Error " + image.src);
				
				self.dispatch( self.EVENT.LOADED );
			});

			$img.attr("src", this.src);
		}

	};
    
	// PUBLIC
	return LoaderImage;

})(window);
