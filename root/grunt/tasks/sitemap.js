'use strict';

module.exports = function(grunt) {

	var Handlebars   = require('handlebars');
	
    grunt.registerTask( "sitemap", "Generation of the sitemap", function(){

        var template = Handlebars.compile( grunt.file.read( "app/tpl/sitemap.hbs"  ) );
        var output   = template( { urls : global.GRUNT.sitemap, baseURL : global.GRUNT.common.baseURL } );

        //app
        grunt.file.write( "app/sitemap.php",  output);
        grunt.file.write( "dist/sitemap.php", output);

    });

};
