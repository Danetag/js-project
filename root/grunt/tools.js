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
	},
	getContents : function(id)
	{
		var nameFile = id + ".json";
	    var aContent = [];

	    for(var i in global.GRUNT.aLang)
	    {
	        var oLang = global.GRUNT.aLang[i];

	        //find all files of this dir
	        var files = oLang.contents;

	        for(var j in files)
	        {
	            var file = files[j];

	            //if, in this lang, we match the ID
	            if( file.replace( oLang.dir + "/", "") ==  nameFile)
	            {
	            	//if(nameFile == "homepage.json")
	            	//	console.log(">>>> TEST : ", oLang.lang, global.GRUNT.grunt.file.readJSON(file))
	                aContent[oLang.lang] = global.GRUNT.grunt.file.readJSON(file);
	            }
	        }
	    }

	    return aContent;
	},
	findSubFiles : function(d)
	{
		var results = [];

		global.GRUNT.grunt.file.expand(d).forEach(function(dir){

	        results.push(dir);

	    });

	    return results;

	}
}
exports.tools = tools
