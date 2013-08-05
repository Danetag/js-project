SNR.LoaderTypes.Audio = (function(window){

    function LoaderAudio(){ SNR.LoaderType.call(this); }

    LoaderAudio.prototype = Object.create(SNR.LoaderType.prototype);
	LoaderAudio.prototype.constructor = LoaderAudio;

    //Public override

    LoaderAudio.prototype.init = function(o)
	{
		//is OGG ?
		this.src  = Modernizr.audio.mp3 ? o.src : o.srcOGG;
		this.name = o.name;
		this.autoplay = o.autoplay || false;
	}

    LoaderAudio.prototype.load = function(){   

    	var self = this;

    	var context = SNR.soundManager.context;

		if(context == null)
		{
			//No Web Audio
			self.dispatch( self.EVENT.LOADED );

			return;
		}

    	var request = new XMLHttpRequest();
		request.open('GET', this.src, true);
		request.responseType = 'arraybuffer';

		// Decode asynchronously
		request.onload = function() {

			context.decodeAudioData(request.response, function(buffer) 
			{
				buffer.loop = self.autoplay;

				self.data = buffer;
				self.dispatch( self.EVENT.LOADED );

			}, function(){
				//error
			});
		}
		request.send();

	};

	LoaderAudio.prototype.isLoaded = function()
	{
		this.audio.removeEventListener('canplaythrough', this.isLoaded.bind(this) , false);

    	if( this.data == null )
    	{
    		this.data = this.audio;
			this.dispatch( this.EVENT.LOADED );
		}
	}
    
	// PUBLIC
	return LoaderAudio;

})(window);
