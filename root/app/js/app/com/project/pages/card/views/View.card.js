JSP.CardView = (function($){

	function CardView()
	{
		this.Model    = null;
		this.name     = null;
		this.idxCard  = 1;

		this.direction      = null;
		this.hasAlreadyOne  = false;
		this.canClick       = false;

		this.$ = {
			oldPage : null,
			body    : null,
			page    : null,
			info    : null,
			infoContent       : null,
			prev    : null,
			next    : null,
			close   : null
		}

		this.events   = {};
		this.EVENT    = {
			INIT     : "init",
			SHOWN    : "shown",
			HIDDEN   : "hiddencardView"
		};

	}
    
    CardView.prototype = {

    	init : function(Model, name, idxCard)
		{
			this.Model   = Model;
			this.name    = name;
			this.idxCard = idxCard;

			this.el();
			this.bindEvents();

			this.dispatch(this.EVENT.INIT);
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
		
		destroy : function()
		{
			this.unbindEvents();

			this.$.page.remove();
			this.unbind();
		},
		el : function()
		{
			this.$.body = $("body");

			//Init view
			this.$.body.addClass("display-card");

			//Page-card
			this.$.page = $(".page-card");
			
			if( this.$.page[0] == undefined) //no fiche
			{
				//inject HTML
				$("#content").append( this.Model.get("html") );
				
				this.$.page = $(".page-card");

			}
			else
			{
				var name = this.$.page.data('card');

				if( name != this.name ) //there's a current one !
				{
					this.hasAlreadyOne = true;
					this.$.oldPage     = this.$.page;

					var currentIxdCard = parseInt( this.$.page.attr("data-idxCard"), 10 );
					var nbCards        = parseInt( this.$.page.attr("data-nbCards"), 10 );

					var classStaging = "staging";
					this.direction   = "left";

					//console.log("currentIxdCard", currentIxdCard, "this.idxCard", this.idxCard)

					if( ( this.idxCard < currentIxdCard ) || ( currentIxdCard == 1 && this.idxCard == nbCards ) ) //prev
					{
						if(  currentIxdCard != nbCards || this.idxCard != 1 )
							this.direction  = "right";
					}	

					//console.log("this.direction", this.direction)

					//New one !
					var zIndex   = parseInt(this.$.page.css("zIndex"), 10);

					//Add a staging class !
					var nextCard = this.Model.get("html");
                	var myRegex  = new RegExp('(class="page-card)', "g");
               	 	var nextCard = nextCard.replace(myRegex, 'class="page-card ' + classStaging);

					$("#content").append( nextCard );

					this.$.page = $(".page-card[data-card="+this.name+"]");
					this.$.page.css("zIndex", zIndex + 1);

				}
				else
				{

				}
			}

			//Other
			this.$.info 		  	 = this.$.page.find(".info");
			this.$.infoContent 		 = this.$.info.find(".info-content");

			this.$.prev 		     = this.$.infoContent.find(".fiche-prev");
			this.$.next 		     = this.$.infoContent.find(".fiche-next");

			this.$.close 			 = this.$.info.find(".close");


		},
		bindEvents : function()
		{

			var self = this;

			this.$.prev.on("click", function(e){ 

				e.preventDefault();

				if(!self.canClick )
					return false;

				$(document).off("keyup");

				History.pushState(null, null, $(this).attr("href") );
			})

			this.$.next.on("click", function(e){ 

				e.preventDefault();

				if(!self.canClick )
					return false;

				$(document).off("keyup");

				History.pushState(null, null, $(this).attr("href") );
			})

			this.$.close.on("click", function(e){

				e.preventDefault();

				if(!self.canClick )
					return false;

				$(document).off("keyup");

				History.pushState(null, null, $(this).attr("href") );

			});

			$(document).on("keyup", function(e)
			{
				switch(e.keyCode)
				{
					case 27 /* esc */   : e.preventDefault(); self.$.close.trigger("click"); break;
					case 37 /* left */  : e.preventDefault(); self.$.prev.trigger("click"); break;
					case 39 /* right */ : e.preventDefault(); self.$.next.trigger("click"); break;				
				}
			});

		},
		unbindEvents : function()
		{

			this.$.prev.off("click");
			this.$.next.off("click");
			this.$.close.off("click");

		},
		show : function()
		{
			var self = this;

			if(!this.hasAlreadyOne)
			{
				TweenLite.to( this.$.close, 1, { delay : 0.2, opacity:1 });
				TweenLite.to( this.$.infoContent, 0.8, { delay : 0.2, opacity:1, onComplete: function(){ 

					self.endShow();

				}});
			}
			else
			{
				var wdW = $(window).width();

				var x      = wdW;
				var xStart = -wdW;
				if(this.direction == "left")
				{
					xStart = wdW;
					x = -wdW;
				}

				TweenLite.fromTo( this.$.oldPage, 0.6, { x : 0 }, { x : x });
				TweenLite.fromTo( this.$.page,    0.6, { x : xStart, opacity : 1 }, { x : 0, onComplete : function(){

					self.endShow();

				}});
					
				
			}

			
		},
		endShow : function()
		{
			this.$.oldPage = null;
			this.$.page.removeClass("staging");

			//z index
			this.$.page.css("zIndex", 31);
			this.canClick = true;
			this.$.body.removeClass("display-card");

			this.dispatch( this.EVENT.SHOWN );
		},
		hideInterCard : function()
		{
			
		},
		deleteClass : function() //Delete the class only if we are going to another card
		{
			this.$.body.removeClass(this.name);
		},
		hide : function()
		{

			this.hideCard();
			
		},
		hideCard : function()
		{
			var self = this;

			TweenLite.to( self.$.page, 0.8, { opacity:0 , ease:Cubic.easeOut , onComplete: function(){ 

				$(document).off("keyup");
				
				setTimeout(function(){

					self.dispatch( self.EVENT.HIDDEN );
					self.destroy();

				}, 200)
				
			}});

		}

	}
	

	return CardView;	

})(jQuery);




