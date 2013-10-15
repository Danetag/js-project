'use strict';

module.exports = function(grunt) {

    grunt.registerTask( "updateRoutes", "Update/create routes from pages", function()
    {

        var JSONroutes = JSON.stringify(global.GRUNT.routes, null, '\t');

        grunt.file.write( "app/data/pages.json",  JSONroutes);
        grunt.file.write( "dist/data/pages.json", JSONroutes);

        console.log("Routes generated");
    });

};
