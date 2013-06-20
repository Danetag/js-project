'use strict';

// # Globbing
module.exports = function (grunt) {

    // load all grunt tasks
    var test = require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    var gruntPck   = grunt.file.readJSON('package.json');

    var config = {
        name : "js-project",
        app  : 'app',
        dist : 'dist'
    };

    /* CSS/JS Files */

    var configScripts = {
        css : {
            app  : config.app  + '/css/'+ gruntPck.namespace +'.css',
            dist : config.dist + '/css/'+ gruntPck.namespace +'.min.css'
        },
        js : {
            app  : config.app  + '/js/'+ gruntPck.namespace +'.js',
            dist : config.dist + '/js/'+ gruntPck.namespace +'.min.js'
        },
        libjs : {
            app  : config.app  + '/js/'+ gruntPck.namespace +'.lib.js',
            dist : config.dist + '/js/'+ gruntPck.namespace +'.min.lib.js'
        }
    };

    /* Routing */
    var routes = { routes : {} };

    /* Page for Handlebars */

    var Handlebars  = require('handlebars');
    var dataPages   = grunt.file.readJSON('data/pages.json');

    var tplFiles    = [];
    var htmlFiles   = [];
    var tplCommon   = dataPages.common;

    /* Add CSS/JS Files with NS */

    tplCommon.css.app.unshift(  { src : '/css/'+ gruntPck.namespace +'.css' } );
    tplCommon.css.dist.unshift( { src : '/css/'+ gruntPck.namespace +'.min.css'} );

    tplCommon.js.app.unshift( { src : '/js/'+ gruntPck.namespace +'.lib.js'} );

    tplCommon.js.dist.unshift( { src : '/js/'+ gruntPck.namespace +'.lib.min.js'} );
    tplCommon.js.dist.unshift( { src : '/js/'+ gruntPck.namespace +'.min.js'} );

    for (var i in dataPages.pages)
    {
        var page = dataPages.pages[i];

        tplFiles.push( { 
            tplFolder : config.app + "/tpl/",
            partials  : page.partials || {},
            src       : config.app + "/tpl/" + page.tpl, 
            dest      : {
                app  : config.app  + "/" + page.html, 
                dist : config.dist + "/" + page.html
            },
            data      : page.data ,
            hasLayout : page.hasLayout || true
        });

        htmlFiles.push({
            src  : config.dist + "/" + page.html,
            dest : config.dist + "/" + page.html
        })

        var route = page.data.route;

        routes.routes[page.name] = route;

    }

    /* Configuration */

    var configOptions = {

        pkg  : grunt.file.readJSON('package.json'),

        less: {
            all: {
              src : config.app + '/css/less/*.less',
              dest: configScripts.css.app,
              options: {
                compress: false
              }
            }
        },

        copy: {
          vendor: {
            files: [
                {expand: true, cwd: config.app  + '/js/vendor/', src: ['**'], dest: config.dist + '/js/vendor/', filter: 'isFile'}, // includes files in path
            ]
          }
        },

        cssmin: {
          base: {
            src : configScripts.css.app,
            dest: configScripts.css.dist
          }
        },

        uglify: {
          base: {
            src : configScripts.libjs.app,
            dest: configScripts.libjs.dist
          }
        },

        htmlmin: {                                    
            dist: {                                     
              options: {                                
                removeComments: true,
                collapseWhitespace: true
              },
              files: htmlFiles
            }
        },

        /* WATCH */

        watch: {
          js: {
            files: config.app + '/js/app/**/*.js',
            tasks: 'devUpdateJS'
          },
          css: {
            files: config.app + '/css/**/*.less',
            tasks: 'devUpdateCSS'
          },
          data : {
            files : "data/pages.json",
            tasks : ["devUpdateJSON", "devUpdateHTML"]
          }
          html : {
            files : config.app + '/tpl/**/*.hbs',
            tasks : "devUpdateHTML",
            options: {
              nospawn: true
            }
          },
          sprite : {
            files : config.app + '/img/sprites/*.png',
            tasks : "devUpdateSprite"
          }
        },

        'closure-compiler': {
          frontend: {
            closurePath: 'compiler/jar',
            js: configScripts.js.app, 
            jsOutputFile: configScripts.js.dist, 
            maxBuffer: 500,
            options: {
              compilation_level: 'SIMPLE_OPTIMIZATIONS',
              language_in: 'ECMASCRIPT5_STRICT',
              externs: {
                files : [
                'compiler/externs/jquery-1.8.js',
                'compiler/externs/underscore-1.3.1.js'
                ]
              }
            }
          }
        },

        concat: {
          js: {
            src: [
                config.app + '/js/app/**/*.js'
            ],
            dest: configScripts.js.app
          },
          libjs: {
            src: [
              config.app + '/js/lib/*.js'
            ],
            dest: configScripts.libjs.app
          }
        }

    };

    grunt.initConfig(configOptions);

    /* Changed files */

    var changedFiles = {};

    grunt.event.on('watch', function(action, filepath) {
        changedFiles = {};
        changedFiles[action] = filepath;
    });

    grunt.registerTask( "updateRoutes", "Update/create routes from pages.json", function(){

        var JSONroutes = JSON.stringify(routes, null, '\t');

        grunt.file.write( config.app  + "/route/route.json", JSONroutes);
        grunt.file.write( config.dist + "/route/route.json", JSONroutes);

        console.log("Routes generated");
    });

    /* compile tempalte files to HTML ! */
    grunt.registerTask( "compileHTML", "Compile HTML from pages.json", function(){

        var files   =  tplFiles;
        var context = "dist";

        if( changedFiles.changed != undefined )
        {
            context = "app";

            for(var i in tplFiles) //No partial !
            {
                if( tplFiles[i].src == changedFiles.changed )
                {
                    files = [ tplFiles[i] ];
                    break;
                }
            }
        }

        for(var i in files)
        {
            var file     = files[i];
            var template = Handlebars.compile( grunt.file.read(file.src) );

            /* Partial */

            //Common
            if( file.hasLayout)
            {
                for(var key in tplCommon.partial)
                {
                    Handlebars.registerPartial("partial." + key, grunt.file.read( file.tplFolder + tplCommon.partial[key]) );    
                }
            }

            //partial page
            for(var key in file.partials)
            {
                Handlebars.registerPartial("partial." + key, grunt.file.read( file.tplFolder + file.partials[key]) );    
            }

            file.data.aCSS = tplCommon.css["app"];
            file.data.aJS  = tplCommon.js["app"];

            var output   = template( file.data );
            grunt.file.write( file.dest.app, output);

            if( context == "dist" ) // Build
            {
                file.data.aCSS   = tplCommon.css["dist"];
                file.data.aJS    = tplCommon.js["dist"];
                var outputDist   = template( file.data ); 

                grunt.file.write( file.dest.dist, outputDist);

                console.log( file.dest.dist + " generated");
            }   

            console.log( file.dest.app + " generated");

        }   

    });

    grunt.registerTask( "devUpdateSprite",[
        "sprite:all",
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

    /* Build */

    grunt.registerTask( "BuildUpdateSprite",[
        "sprite:all"
    ]);

    grunt.registerTask( "BuildUpdateCSS",[
        "devUpdateCSS", 
        "cssmin:base"
    ]);

    grunt.registerTask( "BuildUpdateHTML",[
        "devUpdateJSON",
        "devUpdateHTML",
        "copy:img",
        "htmlmin:dist"
    ]);

    grunt.registerTask( "BuildUpdateJS", [
        "devUpdateJS",
        "copy:vendor",
        "uglify:base",
        "closure-compiler"
    ]);

    grunt.registerTask("build", [
        "BuildUpdateHTML",
        "BuildUpdateSprite",
        "BuildUpdateCSS", 
        "BuildUpdateJS",
    ]);

    /* Default */

    grunt.registerTask('default', [
        'build'
    ]);


};
