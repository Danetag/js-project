var DNT =  DNT || {};

DNT.YTManager = {};

(function($){

    var YTManager = function()
    {
        this.events   = {};
        this.EVENT    = {
            ON_YOUTUBE_IFRAME_API_READY    : "onYouTubeIframeAPIReady"
        };

    };
    
	// PUBLIC
	YTManager.prototype = 
    {
		init : function()
	    {
            this.loadScript();
	    },
        bind : function(name, f)
        {
            this.events[name] = new signals.Signal();
            this.events[name].add(f);
        },
        unbind : function(name, f)
        {
            if(f != undefined)
                this.events[name].remove(f);
            else if( name != undefined)
                this.events[name].removeAll();
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
	    bindEvents : function()
	    {
	    	
	    },
	    unbindEvents : function()
	    {

	    },

        loadScript : function()
        {
            var tag = document.createElement('script');

            tag.src = "http://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            
        },
        onYouTubeIframeAPIReady : function()
        {
            //console.log("onYouTubeIframeAPIReady", this)
            this.dispatch(this.EVENT.ON_YOUTUBE_IFRAME_API_READY);
        }
	    
	};

    DNT.YTManager = new YTManager();

})(jQuery);

//global variables are bad... But there's no other ways :/
var onYouTubeIframeAPIReady = DNT.YTManager.onYouTubeIframeAPIReady.bind( DNT.YTManager );

DNT.YTPlayer = (function(window){

	function YTPlayer(){

		this.events = {};

        this.EVENT = {
            ON_READY           : "onReady",
            ON_STATE_CHANGE    : "onStateChange",
            ON_PLAYBACK_QUALITY_CHANGE : "onPlaybackQualityChange"
        };

        this.player = null;

        this.data = -1;
        this.quality =  null;
	};

	YTPlayer.prototype = {

		init   : function(o)
		{
            var self = this;

			this.player = new YT.Player(o.elID, {
                height     : o.height || "100%",
                width      : o.width  || "100%",
                videoId    : o.videoID,
                playerVars : o.playerVars || null,
                events: {
                  'onReady'      : function(e){ self.onPlayerReady(e) },
                  'onStateChange': function(e){ self.onPlayerStateChange(e) },
                  'onPlaybackQualityChange' : function(e){ self.onPlaybackQualityChange(e) },
                  'onError'      : function(e){ self.onError(e) }
                }
            });
		},
		bind : function(name, f)
		{
			this.events[name] = new signals.Signal();
			this.events[name].add(f);
		},
		unbind : function(name, f)
		{
			if(f != undefined)
                this.events[name].remove(f);
            else if( name != undefined)
                this.events[name].removeAll();
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
		onPlayerReady : function(e)
		{
			this.dispatch(this.EVENT.ON_READY);
		},
		onPlayerStateChange : function(e)
		{
            this.data = e.data;
			this.dispatch(this.EVENT.ON_STATE_CHANGE);
		},
        onPlaybackQualityChange : function(e)
        {
            this.quality = e.data;
            this.dispatch(this.EVENT.ON_PLAYBACK_QUALITY_CHANGE);
        },
        onError : function(e)
        {
            switch(e.data)
            {
                case 2   : console.log("Youtube Error :: The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks."); break;
                case 5   : console.log("Youtube Error :: The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred."); break;
                case 100 : console.log("Youtube Error :: The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private."); break;
                case 101 : console.log("Youtube Error :: The owner of the requested video does not allow it to be played in embedded players."); break;
                case 150 : console.log("Youtube Error :: This error is the same as 101. It's just a 101 error in disguise!"); break;
            }
           
        },
		destroy : function()
		{
            this.unbind();
            this.player.destroy();
            this.player = null;
		}
	}

    return YTPlayer;


})(jQuery);