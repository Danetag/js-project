
JSP.helpers = JSP.helpers || {};

(function(window){

   	function Url(){
   		this.baseHash = JSP.conf.baseUrl + "/" + JSP.conf.lang + "/";
   		this.locationHash = window.location.protocol + "//" + window.location.host;
   	};
    
	// PUBLIC
	Url.prototype = 
    {
		addHash : function(url)
		{
			if(url == null)
				return null;

			var aUrl    = url.split("/");
			var u = "/";
			var canSave = false;

			for(var i = 0; i < aUrl.length; i++)
			{
				if(canSave && aUrl[i].length)
				{
					u += aUrl[i] + "/";
				}

				if( aUrl[i] == JSP.conf.lang )
				{
					//first one we find. Might be cause problem, but I don't think so...
					// only for the current lang.. Hum
					canSave = true;
				}
			}

			if( aUrl[0] != "http:" && aUrl[0] != "https:" )
				u = "/" + JSP.conf.lang  + "/#" + u;

			return u;
		},
		fixHash : function(url)
		{
			if(url == null)
				return null;

			//http://nr.tentation.dev.app/preexp/ 
			// this.locationHash + ce qu'on cherche

			// OU

			//http://nr.tentation.dev.app/fr/#/preexp/ 
			var aUrl    = url.split("/");
			var idxBase = 0;

			if(url.indexOf("#") > -1)
			{
				idxBase = JSP.conf.baseUrl.split("/").length + 2; //2 = lang + hash
			}
			else
			{
				//ie8 ?
				//idxBase = this.baseHash.split("/").length - 1; 

				//ie9
				idxBase = this.baseHash.split("/").length; 

				var splitbase = this.baseHash.split("/");

				// ULTIME 
				for(var i = 0; i < splitbase.length; i++)
				{
					var a = splitbase[i];
					var b = aUrl[i];

					if(a != b || b == undefined )
					{
						//console.log(" ICI", a, b)
						idxBase = i;
						break;
					}
				}
				
			}

			//var idxBase = JSP.conf.baseUrl.split("/").length + 2; //2 = lang + hash
			//var aLocation = this.locationHash.split("/");

			
			var u = "";

			////JSP.console.log("idxBase :: ", idxBase, " , aUrl.length :: ",  aUrl.length, " , url :: ", url)

			for(var i = idxBase; i < aUrl.length; i++)
			{
				if(aUrl[i].length)
				{
					////JSP.console.log("aUrl[i]  :: ", aUrl[i])
					u += aUrl[i] + "/";
				}

			}

			return this.baseHash + "#/" + u;
		},
		allowed : function(url) 
		{
			var aBase_ = this.baseHash.split("/");
			var aUrl_  = url.split("/");

			var aBase = []; 
			var aUrl  = [];

			for(var i = 0; i < aBase_.length; i++)
			{
				if(aBase_[i] != "" )
					aBase.push(aBase_[i])
			}

			for(var i = 0; i < aUrl_.length; i++)
			{
				if(aUrl_[i] != "" )
					aUrl.push(aUrl_[i])
			}

			if( aBase[aBase.length-1] != aUrl[aBase.length-1] )
				return false;

			return true;
		}
		
	};

    
	JSP.helpers.Url = new Url();

})(window);
