JSP.LoaderTypes.Data = (function(window){

    function LoaderData(){ JSP.LoaderType.call(this); }

    LoaderData.prototype = Object.create(JSP.LoaderType.prototype);
	LoaderData.prototype.constructor = LoaderData;

    //Public override

    LoaderData.prototype.load = function(){   

    	var self = this;

    	$.ajax({
			url : this.src,
			success: function(data) {

				var $data = $(data).filter(self.filter);

				if(self.find)
				{
					$data = $data.find(self.find);
				}

				self.data = $data.html();
				self.dispatch( self.EVENT.LOADED );
			},
			error: function (xhr, ajaxOptions, thrownError) {
		        console.log(xhr, ajaxOptions, thrownError);
		    }
		})

	};
    
	// PUBLIC
	return LoaderData;

})(window);
