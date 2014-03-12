'use strict';

module.exports = function(grunt) {

    grunt.registerTask( "BuildUpdateSprite",[
        "sprite",
        "copy"
    ]);

    grunt.registerTask( "BuildUpdateCSS",[
        "devUpdateCSS", 
        "cssmin:base"
    ]);

    grunt.registerTask( "BuildUpdateHTML",[
        "devUpdateJSON",
        "devUpdateHTML",
        "sitemap",
    ]);

    grunt.registerTask( "BuildUpdateJS", [
        "devUpdateJS",
        "copy:vendor",
        "uglify:base",
        "copy:ie",
        "closure-compiler"
    ]);

    grunt.registerTask("build", [
        'clean',
        "BuildUpdateHTML",
        "BuildUpdateSprite",
        "BuildUpdateCSS", 
        "BuildUpdateJS",
    ]);

};
