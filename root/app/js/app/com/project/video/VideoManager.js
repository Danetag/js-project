JSP.VideoManager = (function(window){

   function VideoManager(player, endTimecode)
   {

   		JSP.EventDispatcher.call(this);

		this.EVENT    = {
			INIT       : "INIT",
			IS_MUTED   : "IsMuted",
			IS_UNMUTED : "IsUnMuted",
			END        : "end"
		};

		this.player 	 = player;
		this.endTimecode = endTimecode;

		this.id          = "VideoManager_" + Math.round( Math.random() * endTimecode ) ;
		this.time   	 = 0;
		this.canWatch 	 = true;
		this.ended  	 = false;

		this.raf = null;

		//////JSP.console.log("new VideoManager", this.id);

    };

    VideoManager.prototype = Object.create(JSP.EventDispatcher.prototype);
	VideoManager.prototype.constructor = VideoManager;
    
	// PUBLIC
	VideoManager.prototype.init = function()
    {
    	this.el();
        this.bindEvents();
    }
	VideoManager.prototype.el = function()
	{
		
	}
    VideoManager.prototype.bindEvents = function()
    {
    	//JSP.soundManager.bind( JSP.soundManager.EVENT.IS_MUTED    , this.mute.bind(this),   this.id );
    	//JSP.soundManager.bind( JSP.soundManager.EVENT.IS_UNMUTED  , this.unmute.bind(this), this.id );
    }
    VideoManager.prototype.unbindEvents = function()
    {
    	//JSP.soundManager.unbind( JSP.soundManager.EVENT.IS_MUTED  , this.mute.bind(this),   this.id );
    	//JSP.soundManager.unbind( JSP.soundManager.EVENT.IS_UNMUTED, this.unmute.bind(this), this.id );
    }
	VideoManager.prototype.mute = function(e)
	{
		this.fadeVolumePlayer( { direct : e.direct, start : 100, end : 0 } );
	}
	VideoManager.prototype.unmute = function(e)
	{
		this.fadeVolumePlayer({ direct : e.direct, start : 0, end : 100 });	
	}
	VideoManager.prototype.watch = function()
	{
		this.ended = false;

		this.raf = requestAnimationFrame( $.proxy(this.watching, this) );
	}
	VideoManager.prototype.fadeVolumePlayer    = function(o)
	{
		if( this.player == null)
			return;

		//////JSP.console.log("fadeVolumePlayer this.id", this.id)

		this.endTimecode = this.endTimecode; // ?? Have to change a property .. :/

		var direct = ( o.direct != undefined ) ? o.direct : false;
		var self   = this;

		if( this.player.getVolume() == o.end ) //no need
			return;

		if(direct){
			self.player.setVolume(o.end);
		}
		else{

			var volume = {soundLevel : o.start};

			TweenLite.to(volume, 1, { soundLevel : o.end , ease:Cubic.easeOut , onUpdateParams:["{self}"],  onUpdate : function(tween){

				var v = Math.round(tween.target.soundLevel);
				self.player.setVolume(v);

			}, onComplete : function(){

			}});
			
		}
	}
	VideoManager.prototype.watching = function()
	{

		if(!this.canWatch)
			return;

		//get time
		this.time = this.player.getCurrentTime() * 1000;

		//END
		if( this.time >= this.endTimecode)
		{
			this.end();
			return;
		}
		else
			this.raf = requestAnimationFrame( $.proxy(this.watching, this) );
		
	}
	VideoManager.prototype.end = function()
	{
		this.canWatch = false;

		//pause
		this.player.pauseVideo();

		this.dispatch( this.EVENT.END );

	}
	VideoManager.prototype.destroy = function()
	{
		this.unbindEvents();
		this.unbind();
	}
		

    return VideoManager;

})(window);