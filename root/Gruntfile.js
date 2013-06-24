'use strict';

// # Globbing
module.exports = function (grunt) {

    // load all grunt tasks
    var test = require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    var gruntPck   = grunt.file.readJSON('package.json');

    var config = {
        name : gruntPck.name,
        app  : 'app',
        dist : 'dist'
    };

    /* CSS/JS Files */

    var configScripts = 
    {
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
    var pages = { pages : {} };
    var menu   = {};

    /* Page for Handlebars */

    var Handlebars  = require('handlebars');
    var dataPages   = grunt.file.readJSON('data/pages.json');

    var tplFiles    = [];
    var htmlFiles   = [];
    var tplCommon   = dataPages.common;

    pages.primaryAssets = tplCommon.assets;

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
            /* // Dest are generated from datas !
            dest      : {
                app  : config.app  + "/" + page.html, 
                dist : config.dist + "/" + page.html
            },
            */
            data      : page.data ,
            hasLayout : page.hasLayout || true
        });

        var pageJS = {};

        for( var lang in page.data)
        {
            var content = page.data[lang];

            htmlFiles.push({
                src  : config.dist + "/" + content.output,
                dest : config.dist + "/" + content.output
            });

            pageJS[lang] = { route : content.route, label : content.label, assets : content.assets };

            if( menu[lang] == undefined)
                menu[lang] = [];

            menu[lang].push( { route : content.route, label : content.label } );

        }

        pages.pages[page.name] = pageJS;

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
          },
          img : {
            files: [
                {expand: true, cwd: config.app  + '/img/', src: ['**'], dest: config.dist + '/img/', filter: 'isFile'}, // includes files in path
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

        sprite : {
            all : {

                // Sprite files to read in
                'src':     config.app + '/img/sprite/*.png',

                // Location to output spritesheet
                'destImg': config.app +'/img/sprite.png',

                // Stylus with variables under sprite names
                'destCSS': config.app +'/css/less/sprite.less',

                // OPTIONAL: Manual override for imgPath specified in CSS
                //'imgPath': '../sprite.png',

                // OPTIONAL: Specify algorithm (top-down, left-right, diagonal [\ format],
                // alt-diagonal [/ format], binary-tree [best packing])
                'algorithm': 'binary-tree',

                // OPTIONAL: Specify engine (auto, canvas, gm)
                'engine': 'auto',

                // OPTIONAL: Specify CSS format (inferred from destCSS' extension by default)
                // (stylus, scss, sass, less, json, css)
                'cssFormat': 'less',

                // OPTIONAL: Specify settings for engine
                'engineOpts': {
                    'imagemagick': true
                },

                // OPTIONAL: Specify img options
                'imgOpts': {
                    // Format of the image (inferred from destImg' extension by default) (jpg, png)
                    'format': 'png',

                    // Quality of image (gm only)
                    //'quality': 90
                },

                // OPTIONAL: Specify css options
                'cssOpts': {
                    // Some templates allow for skipping of function declarations
                    'functions': false
                }

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
          },
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
                config.app + '/js/app/main.js',
                config.app + '/js/app/**/*.js'
            ],
            dest: configScripts.js.app
          },
          libjs: {
            src: [
                //config.app + '/js/lib/history.js',
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

            /* End Partial */

            /* Datas */

            //file.data.aCSS = tplCommon.css["app"];
            //file.data.aJS  = tplCommon.js["app"];

            /* End Datas */

            /* output by Language */

            for( var lang in file.data)
            {
                var data = file.data[lang];

                /* CSS/JS */
                data.aCSS    = tplCommon.css["app"];
                data.aJS     = tplCommon.js["app"];

                data.lang    = lang;
                //data.routes  = routes.routes;
                data.menu    = menu;

                var output   = template( data );

                //app
                grunt.file.write( config.app + "/"+ data.output, output);

                if( context == "dist" ) // Build
                {
                    /* CSS/JS */
                    data.aCSS = tplCommon.css["dist"];
                    data.aJS  = tplCommon.js["dist"];

                    var outputDist   = template( data ); 

                    grunt.file.write( config.dist + "/"+ data.output, outputDist);

                    console.log( config.dist + "/"+ data.output + " generated");
                }   

                console.log( config.app + "/"+ data.output + " generated");


            }

        }   

    });

    grunt.registerTask( "updateRoutes", "Update/create pages from pages.json", function(){

        var JSONroutes = JSON.stringify(pages, null, '\t');

        grunt.file.write( config.app  + "/data/pages.json", JSONroutes);
        grunt.file.write( config.dist + "/data/pages.json", JSONroutes);

        console.log("Pages generated");
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
