/* For Google Closure ... */

window["requestAnimFrame"] = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function( callback ){
          	window.setTimeout(callback, 1000 / 60);
          };
})();

var APP = APP||{};
APP.main = {};
APP.main.onReady = {};

window["APP"] = APP;

/* OK Let's go */

APP.main = (function($){

	return {

		onReady : function()
		{
			console.log("------------ ON READY ------------")

		}

	}
		

})(jQuery);


APP["main"] = APP.main;
APP.main["onReady"] = APP.main.onReady;


//LET GO
$(document).ready(APP.main.onReady);
		




