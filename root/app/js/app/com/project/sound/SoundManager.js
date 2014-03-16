JSP.SoundManager = {};

(function($){

    function SoundManager(){

        JSP.EventDispatcher.call(this);

        this.audioSupport = true;
        this.volume       = true;
        this.volumeIsChanging    = false;

        this.canToggleFromOutside = true;

        this.sounds = {

        };

        this.EVENT = {
            IS_MUTED   : "isMuted",
            IS_UNMUTED : "isunMuted"
        };

    };

    SoundManager.prototype = Object.create(JSP.EventDispatcher.prototype);
    SoundManager.prototype.constructor = SoundManager;
    
    // PUBLIC
    SoundManager.prototype.init = function ()
    {
        //If IE < 10, no audio support
        if( !JSP.conf.hasAudio)
            this.audioSupport = false;

    }

    SoundManager.prototype.bindEvents = function()
    {
        
    }
    SoundManager.prototype.unbindEvents = function()
    {

    }
    SoundManager.prototype.add = function(key, o)
    {
        if(!this.audioSupport)
            return;

        var option = o || {};

        if(this.sounds[key] == undefined)
        {
            this.sounds[key] = { instance : createjs.Sound.createInstance(key), option : option, wasPlaying : false  };
        }   

    }
    SoundManager.prototype.toggle = function(f)
    {
        var fromApp = (f != undefined) ? f : true;

        if(!this.canToggleFromOutside && !fromApp)
            return;

        if(this.volume)
        {
            if(fromApp)
                this.canToggleFromOutside = false;

            this.muteAll();
        }
        else
        {
            this.canToggleFromOutside = true;
            this.playAll();
        }
    }
    SoundManager.prototype.muteAll  = function(d)
    {
        if(!this.volume || this.volumeIsChanging || !this.audioSupport)  //already mutted
            return;
            
        this.volume    = false;
        this.volumeIsChanging = true;

        var direct = d || false;

        if(direct)
        {
            createjs.Sound.setMute(true);
            return;
        }            

        for(var s in this.sounds)
        {
            this.mute(s, false, true);
        }

        
    }
    SoundManager.prototype.playAll = function(d)
    {
        if(this.volume || this.volumeIsChanging || !this.audioSupport )  //already unmutted
            return;

        this.volume    = true;
        this.volumeIsChanging = true;

        var direct = d || false; 

        for(var s in this.sounds)
        {
            var sound = this.sounds[s];

            if( sound.wasPlaying ) //play only sound which were playing
                this.play(s, direct, true);
        }

    }
    SoundManager.prototype.play = function(key, d, p)
    {
        var direct  = d || false;
        var playAll = p || false;

        if( !this.audioSupport )
            return;

        var sound       = this.sounds[key];

        // site mutted
        if( !this.volume || sound == undefined )
            return;

        sound.instance.play( sound.option );

        if(sound.option.loop == -1)
            sound.wasPlaying = true; //is playing, indeed, only if is a loop.

        if(direct)
        {
            sound.instance.volume  = 1;

            if(playAll)
                _dispatchAllPlayed.call(this);
        }
        else
        {
            var self = this;

            TweenLite.to( { soundLevel : sound.instance.volume } , 1, { soundLevel : 1 , ease:Cubic.easeOut , onUpdateParams:["{self}"],  onUpdate : function(tween){

                var v = tween.target.soundLevel; 
                sound.instance.volume = v;

            }, onComplete : function(){

                _dispatchAllPlayed.call(self);

            }});
        }
    }
    SoundManager.prototype.mute = function(key, d, m)
    {
        var direct  = d || false;
        var muteAll = m || false; //if mute all, the current sound WAS playing, so it could be played on the next playAll();

        if(!this.audioSupport)
            return;     

        var sound       = this.sounds[key];
       
        if( !sound.instance.volume || sound == undefined )
            return;

        if(!muteAll)
            sound.wasPlaying = false; //not playing, indeed.

        if(direct)
        {
            sound.instance.setMute(true);
            _dispatchAllMutted.call(this);
        }
        else
        {
            var self = this;

            TweenLite.to(  { soundLevel : sound.instance.volume } , 1, { soundLevel : 0 , ease:Cubic.easeOut , onUpdateParams:["{self}"],  onUpdate : function(tween){

                var v = tween.target.soundLevel; 
                sound.instance.volume = v;

            }, onComplete : function(){

                sound.instance.pause();
                _dispatchAllMutted.call(self);

            }});
        }

    }

    var _dispatchAllPlayed = function()
    {
        var canDispatch = true;

        for(var s in this.sounds)
        {
            var sound = this.sounds[s];

            if( sound.wasPlaying && sound.instance.volume != 1 ) 
                canDispatch = false;
        }

        if(canDispatch)
        {   
            this.dispatch( this.EVENT.IS_UNMUTED );
            this.volumeIsChanging = false;
        }    
    }

    var _dispatchAllMutted = function()
    {
        var canDispatch = true;

        for(var s in this.sounds)
        {
            var sound = this.sounds[s];

            if( sound.instance.volume !== 0 ) 
                canDispatch = false;
        }

        if(canDispatch)
        {
            this.dispatch( this.EVENT.IS_MUTED );
            this.volumeIsChanging = false;
        }   
    }

    JSP.SoundManager = new SoundManager();

})(jQuery);