'use strict';

module.exports = function(grunt) {

    grunt.registerTask( "devUpdateSprite",[
        "sprite",
        "devUpdateCSS"
    ]); 

    grunt.registerTask( "devUpdateJSON",[
        "updateRoutes"
    ]); 

    grunt.registerTask( "devUpdateHTML",[
        "compileHTML"
    ]);    

    grunt.registerTask( "devUpdateCSS",[
        "less:all"
    ]);

    grunt.registerTask( "devUpdateJS", [
        "concat:js", 
        "concat:libjs"
    ]);

};
