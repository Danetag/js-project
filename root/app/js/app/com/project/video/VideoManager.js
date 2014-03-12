JSP.VideoManager = (function(window){

   function VideoManager(player, endTimecode){

    	this.events   = {};
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
    
	// PUBLIC
	VideoManager.prototype = 
    {
		init : function()
	    {
	    	this.el();
            this.bindEvents();
	    },
		el : function()
		{
			
		},
	    bindEvents : function()
	    {
	    	//JSP.soundManager.bind( JSP.soundManager.EVENT.IS_MUTED    , this.mute.bind(this),   this.id );
	    	//JSP.soundManager.bind( JSP.soundManager.EVENT.IS_UNMUTED  , this.unmute.bind(this), this.id );
	    },
	    unbindEvents : function()
	    {
	    	//JSP.soundManager.unbind( JSP.soundManager.EVENT.IS_MUTED  , this.mute.bind(this),   this.id );
	    	//JSP.soundManager.unbind( JSP.soundManager.EVENT.IS_UNMUTED, this.unmute.bind(this), this.id );
	    },
	    bind : function(name, f)
		{
			this.events[name] = new signals.Signal();
			this.events[name].add(f);
		},
		unbind : function(name, f)
		{
			if(f != undefined)
            {
                this.events[name].remove(f);
                //delete this.events[name];
            }   
            else if( name != undefined)
            {
                this.events[name].removeAll();
                //delete this.events[name];
            }   
            else
            {
                for(var name in this.events)
                {
                    this.unbind(name);
                }
            }
		},
		dispatch : function(name)
		{
			if( this.events[name] == undefined ) // Only if the event is registred
				return;

			this.events[name].dispatch();
		},
		mute : function(e)
		{
			this.fadeVolumePlayer( { direct : e.direct, start : 100, end : 0 } );
		},
		unmute : function(e)
		{
			this.fadeVolumePlayer({ direct : e.direct, start : 0, end : 100 });	
		},
		watch : function()
		{
			this.ended = false;

			this.raf = requestAnimationFrame( $.proxy(this.watching, this) );
		},
		fadeVolumePlayer    : function(o)
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
		},
		watching : function()
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
			
		},
		end : function()
		{
			this.canWatch = false;

			//pause
			this.player.pauseVideo();

			this.dispatch( this.EVENT.END );

		},
		destroy : function()
		{
			this.unbindEvents();
			this.unbind();
		}
		
	};

    return VideoManager;

})(window);