JSP.conf = JSP.conf || {};

JSP.conf = {

	baseUrl 		 : JSP.conf.baseUrl || ( window.location.href.split( '/' )[0] + "//" + window.location.href.split( '/' )[2] ),
	lang    		 : JSP.conf.lang    || "en",
	jSVar    		 : JSP.conf.jSVar   || {},
	cardInfos	  	 : JSP.conf.cardInfos   || {},
	translate   	 : JSP.conf.translate,
	perfLess 		 : false,
	device      	 : null,
	isIE			 : false,
	hasPushState	 : JSP.conf.hasPushState || !!(window.history && history.pushState)

}

;(function(window){

	//init
	Detectizr.detect();
	JSP.conf.device = Detectizr.device;

})(window);



