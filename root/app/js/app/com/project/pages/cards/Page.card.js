JSP.Pages.card = (function($){

	function CardPage(){ 
		JSP.Page.call(this); 
		this.cards = []; 
		this.block = false;
	}

    CardPage.prototype = Object.create(JSP.Page.prototype);
	CardPage.prototype.constructor = CardPage;

    //Public override

    CardPage.prototype.init   = function(obj)
	{
		this.id 	    = obj.id;
		this.name       = obj.name;
		this.jSVar      = obj.jSVar;

		//if one existed and we would like to display it.. Do nothing ! Just block and it will dispatch on load.
		if( this.cards[0] != undefined && this.cards[0].name == obj.name )
		{
			this.block = true;
			return;
		}

		var Card = new JSP.Card(obj);
		Card.init();

		//if there's one, display the new one and delete the old one
		this.cards.push(Card);

	}

	CardPage.prototype.load  = function()
	{
		if(this.block)
		{ 
			this.dispatch(this.EVENT.VIEW_INIT);  //view already init
			return;
		}

		var Card = this.cards[ this.cards.length - 1 ];

		Card.bind.call( Card, Card.EVENT.LOADED, this.loaded.bind(this));
		Card.load.call( Card );
	}

	CardPage.prototype.loaded = function()
	{
		var Card = this.cards[ this.cards.length - 1 ];

		Card.unbind.call( Card, Card.EVENT.LOADED, this.loaded.bind(this));
		this.dispatch(this.EVENT.IS_LOADED);
		//this.initView();

	};

	CardPage.prototype.initView = function()
	{
		var Card = this.cards[ this.cards.length - 1 ];

		Card.bind.call( Card, Card.EVENT.INITVIEW, this.onViewInit.bind(this));
		Card.initView.call( Card );
	}

	CardPage.prototype.onViewInit = function()
	{
		
		var Card = this.cards[ this.cards.length - 1 ];

		Card.unbind.call(Card, Card.EVENT.INITVIEW, this.onViewInit.bind(this));
		this.dispatch(this.EVENT.VIEW_INIT);
		
	}


	CardPage.prototype.hideLoader = function()
	{
		var Card = this.cards[ this.cards.length - 1 ];
		
		//hide Loader
		Card.bind.call( Card, Card.EVENT.LOADER_IS_DESTROYED, this.loaderDestroyed.bind(this));
		Card.hideLoader.call(Card);
	}

	CardPage.prototype.loaderDestroyed = function()
	{
		var Card = this.cards[ this.cards.length - 1 ];

		Card.unbind.call( Card, Card.EVENT.LOADER_IS_DESTROYED, this.loaderDestroyed.bind(this));
		this.dispatch(this.EVENT.LOADER_IS_DESTROYED);
	}




	CardPage.prototype.onViewInitAfterLoad = function()
	{
		var Card = this.cards[ this.cards.length - 1 ];

		Card.unbind.call( Card, Card.EVENT.INITVIEW, this.onViewInitAfterLoad.bind(this));
		this.dispatch( this.EVENT.VIEW_INIT );
	}

	CardPage.prototype.getCurrentCard = function()
	{
		if( this.cards[ this.cards.length - 1 ] != undefined )
			return this.cards[ this.cards.length - 1 ];

		return null;
	}

	CardPage.prototype.show = function()
	{

		if(this.block)
		{
			this.dispatch( this.EVENT.SHOWN ); // already shown!

			this.block = false; //deblock
			return;
		}

		var Card = this.cards[ this.cards.length - 1 ];

		if( JSP.routeManager.current.id == "card" && this.cards.length > 1) // from a card to a card
		{
			var firstCard = this.cards[0];
			firstCard.hideInterCard.call(firstCard);
		}

		Card.bind.call( Card, Card.EVENT.SHOWN, this.shown.bind(this) );
		Card.show.call( Card );
	};


	CardPage.prototype.shown = function()
	{
		
		var Card = this.cards[ this.cards.length - 1 ];

		Card.unbind.call( Card, Card.EVENT.SHOWN, this.shown.bind(this) );

		//show the main view obviously
		//JSP.Pages.main.View.show();

		//destroy old one

		if( this.cards.length > 1)
		{
			var firstCard = this.cards[0];
			firstCard.deleteClass.call(firstCard);
			firstCard.destroy.call(firstCard);
			this.cards.splice(0,1);
		}

		this.dispatch( this.EVENT.SHOWN );
	};

	CardPage.prototype.unbindEvents = function()
	{
		var Card = this.cards[ this.cards.length - 1 ];
		Card.unbindEvents();
	}

	CardPage.prototype.hide = function()
	{

		//get current route. If we are from a card, not hide it now. ('Cause we are going to destroy it. Simply.')
		if( JSP.routeManager.next.id == "card")
		{
			this.dispatch( this.EVENT.HIDDEN );
		}
		else
		{
			var Card = this.cards[ this.cards.length - 1 ];

			//hide current
			Card.bind.call( Card, Card.EVENT.HIDDEN, this.hidden.bind(this) );
			Card.hide.call( Card );
		}
	};

		CardPage.prototype.hidden = function()
		{
			var Card = this.cards[ this.cards.length - 1 ];

			Card.unbind.call( Card, Card.EVENT.HIDDEN, this.hidden.bind(this) );
			Card.destroy.call( Card );
			this.cards.length = 0; //FINAL DESTROY MOUHAHAHAHA

			this.dispatch( this.EVENT.HIDDEN );
		};


	return new CardPage();

})(jQuery);




