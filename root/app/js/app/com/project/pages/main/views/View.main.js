JSP.Views = JSP.Views || {};

JSP.Views.main = (function($){

	function MainView(){ 

		this.mainLoaderDeleted = false;

		JSP.View.call(this); 

	}

    MainView.prototype = Object.create(JSP.View.prototype);
	MainView.prototype.constructor = MainView;

    //Public override

	MainView.prototype.el = function()
	{
		this.$ = 
		{
			body    : null,
			content : null,
			header  : {
				a : null
			},
			footer : {
				el : null,
				sound : null
			}	
		};

		this.$.header.a 	= $("#header a");
		this.$.body     	= $("body");
		this.$.html     	= $("html");
		this.$.content  	= $("#content");
		this.$.footer.el 	= $("#footer")
		this.$.footer.sound = this.$.footer.el.find(".sound");

		//this.bindEvents();

		this.initTablet();
	}

	MainView.prototype.bindEvents = function()
	{
		var self = this;

		JSP.SoundManager.bind(JSP.SoundManager.EVENT.IS_MUTED,   this.toggleFooterSoundLabel.bind(this) );
		JSP.SoundManager.bind(JSP.SoundManager.EVENT.IS_UNMUTED, this.toggleFooterSoundLabel.bind(this) );

		this.$.body.find("a.link").on("click", function(e){

			e.preventDefault();
				
			if( $(this).hasClass("popup") )
			{
				var id    = $(this).data("page") || false;
				JSP.PopupsManager.open(id);

				return;
			}

			var href = $(this).attr("href");

			if( !JSP.conf.hasPushState  )
				href = JSP.helpers.Url.addHash( href )

			History.pushState(null, null, href );

		});

		this.$.footer.sound.on("click", function(e){

			e.preventDefault();

			JSP.SoundManager.toggle();

		})

	}

	MainView.prototype.toggleFooterSoundLabel = function()
	{
		if(JSP.SoundManager.volume)
		{
			this.$.footer.sound.removeClass("off").addClass("on");
		}	
		else
		{
			this.$.footer.sound.removeClass("on").addClass("off");
		}	
	}

	MainView.prototype.unbindEvents = function()
	{
		JSP.SoundManager.unbind(JSP.SoundManager.EVENT.IS_MUTED, this.toggleFooterSoundLabel.bind(this) );
		JSP.SoundManager.unbind(JSP.SoundManager.EVENT.IS_UNMUTED, this.toggleFooterSoundLabel.bind(this) );

		this.$.footer.sound.off("click");
		this.$.body.off("click", ".link");
		
	}

	MainView.prototype.initTablet = function()
	{
		if( JSP.conf.device.type != "tablet")
			return;

		//this.addProtectionMove();
	}


	MainView.prototype.addProtectionMove = function()
	{
		if( JSP.conf.device.type != "tablet")
			return;

		document.ontouchmove = function(event){
		    event.preventDefault();
		}	
	}

	MainView.prototype.removeProtectionMove = function()
	{
		if( JSP.conf.device.type != "tablet")
			return;
		
		document.removeEventListener("ontouchmove")
	}


	return new MainView();	

})(jQuery);




