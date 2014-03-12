JSP.console = {};

(function(window){

    function Console(){

      this.methods = [
          'assert',       'clear',    'count', 'debug',   'dir',      'dirxml',   'error',
          'exception',    'group',    'groupCollapsed',   'groupEnd', 'info',     'log',
          'markTimeline', 'profile',  'profileEnd',       'table',    'time', '   timeEnd',
          'timeStamp',    'trace',    'warn'
      ];

      this.console = (window.console = window.console || {});
      this.isOn = false;
      
    };

    Console.prototype = {

      init : function()
      {
        var length = this.methods.length;
        var method = null;
        var noop   = function () {};

        while(length--)
        {
            method = this.methods[length];

            if(!this.console[method])
            {
                this.console[method] = noop;
            }
        }

        this.isAvailable();
      },
      isAvailable   : function(){ 
        
        this.isOn = (typeof console == 'object'|| typeof console.log == 'function') ? true : false;

        this.console.log('JSP.console enabled: '+ this.isOn);

        return this.isOn;

      },
      status      : function(action)
      {
        if(action == 'on'){ this.isOn = true; }
        if(action == 'off'){ this.isOn = false; }
      },
      log         : function(){  if(this.isOn){ var str = ""; for(var i=0; i < arguments.length; i++) { str += arguments[i] + " " } console.log(str);}},
      debug       : function(){  if(this.isOn){ console.debug(arguments);}},
      info        : function(){  if(this.isOn){ console.info(arguments);}},
      warn        : function(){  if(this.isOn){ console.warn(arguments);}},
      error       : function(){  if(this.isOn){ console.error(arguments);}},
      trace       : function(){  if(this.isOn){ console.trace();}},
      group       : function(){  if(this.isOn){ console.group(arguments);}},
      groupEnd    : function(){  if(this.isOn){ console.groupEnd();}},
      dir         : function(){  if(this.isOn){ console.dir(arguments);}},
      dirxml      : function(){  if(this.isOn){ console.dirxml(arguments);}}
    }
    
    
  JSP.console = new Console();
  JSP.console.init()

})(window);
