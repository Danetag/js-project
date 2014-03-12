
JSP.AssetsManager = {};

(function(window){

   	function AssetsManager()
   	{
   		this.assets = [];	
   		this.canStock = true;
   	};
    
	// PUBLIC
	AssetsManager.prototype = 
    {
    	init : function()
    	{
	   		////JSP.console.log("this.canStock", this.canStock)
    	},
		add : function(obj)
		{
			if( this.assets[obj.src] != undefined)
				return false;

			if(!this.canStock)
			{
				obj.result = obj.raw = null;
				//console.log("memory less ! ", obj.id)
			}	

			//console.log("this.assets[obj.src]", obj  )
			this.assets[obj.src] = obj;
		},
		find : function(obj)
		{
			if( this.assets[obj.src] == undefined)
				return false;

			return true;
		},
		findByID : function(ID)
		{
			for(var i in this.assets)
			{
				if(this.assets[i].id == ID)
					return this.assets[i];
			}
			return null;
		}
		
	};

    
	JSP.AssetsManager = new AssetsManager();

})(window);
