JSP.conf = JSP.conf || {};

JSP.conf = {

	baseUrl 	: JSP.conf.baseUrl || ( window.location.href.split( '/' )[0] + "//" + window.location.href.split( '/' )[2] ),
	lang    	: JSP.conf.lang    || "en",
	translate   : JSP.conf.translate,
	device      : null

}

;(function(window){

	//init
	Modernizr.Detectizr.detect();
	SNR.conf.device = Modernizr.Detectizr.device;

})(window);



