JSP.Card = (function($){

	function Card(){  JSP.Page.call(this); }

    Card.prototype = Object.create(JSP.Page.prototype);
	Card.prototype.constructor = Card;

    //Public override

    Card.prototype.init = function(o)
	{
		this.id 	     	= o.id;
		this.name        	= o.name;
		this.jSVar       	= o.jSVar;
		this.bodyClass   	= o.bodyClass;
		this.popupClass  	= o.popupClass;
		this.isPopup     	= o.isPopup;
		this.loaderViewType = o.loaderViewType;

		this.idxCard 		= parseInt( o.name.replace("card", ''), 10 );

		this.initModel();
		this.initAssets();
	}

	Card.prototype.initView = function()
	{
		this.View = new JSP.CardView();

		this.View.bind.call(this.View, this.View.EVENT.INIT, this.onViewInit.bind(this));
		this.View.init.call(this.View , 
		{ 
			id    			 : this.id, 
			name  			 : this.name, 
			Model 			 : this.Model,
			jSVar 			 : this.jSVar,
			bodyClass 		 : this.bodyClass,
			popupClass 		 : this.popupClass,
			isPopup	         : this.isPopup,
			idxCard			 : this.idxCard
		});
	}

	Card.prototype.initLoaderView = function() //to override
	{
		switch(this.loaderViewType)
		{
			case "basic" : this.Loader.loaderView  = new JSP.LoaderViews.Basic(); break;
			case "card"  : this.Loader.loaderView  = new JSP.LoaderViews.Card(); break;

			default      : this.Loader.loaderView  = new JSP.LoaderViews.Card(); break;
		}
	}

	Card.prototype.hideInterCard = function()
	{
		this.View.hideInterCard.call( this.View );
	}

	Card.prototype.deleteClass = function()
	{
		this.View.deleteClass.call(this.View);
	}

	return Card;

})(jQuery);




