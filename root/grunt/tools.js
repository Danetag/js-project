'use strict';

var tools = {

	getPageInJSON : function(name)
    {
		for(var i in global.GRUNT.tplFiles)
        {
            var p = global.GRUNT.tplFiles[i];

            if(p.name == name)
                return p;
        }
	}
}


exports.tools = tools
