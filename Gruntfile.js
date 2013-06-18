'use strict';

// # Globbing
module.exports = function (grunt) {

    // load all grunt tasks
    var test = require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var config = {
        name : "js-project",
        app  : 'app',
        dist : 'dist'
    };

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        less: {
            all: {
              src : config.app + '/css/less/*.less',
              dest: config.app +'/css/app.css',
              options: {
                compress: false
              }
            }
        },


        //lint: {
          //files: [
            //config.app + "/js/**/*.js"
          //]
        //},

        //jshint: {
         // options: {
           // scripturl: true
          //}
        //},

        cssmin: {
          base: {
            src : config.app  + '/css/app.css',
            dest: config.dist + '/css/app.min.css'
          }
        },

        uglify: {
          base: {
            src : config.app  + '/js/app.lib.js',
            dest: config.dist + "/js/app.lib.min.js"
          }
        },

        /* WATCH */

        watch: {
          js: {
            files: [
                config.app + '/js/app/**/*.js'
            ],
            tasks: 'devUpdateJS'
          },
          css: {
            files: config.app + 'css/**/*.less',
            tasks: 'devUpdateCSS'
          }
        },

        'closure-compiler': {
          frontend: {
            closurePath: 'compiler/jar',
            js: config.app + '/js/app.js',
            jsOutputFile: config.dist + '/js/app.min.js',
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
          //css: {
            //src: [ 
              //  config.app + '/css/app.css'
            //], 
            //dest: config.dist + '/css/app.min.css'
          //},
          js: {
            src: [
                config.app + '/js/app/**/*.js'
            ],
            dest: config.app + '/js/app.js'
          },
          libjs: {
            src: [
              config.app + '/js/lib/*.js'
            ],
            dest: config.app + '/js/app.lib.js'
          }
        }

    });

    //grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask( "devUpdateCSS",[
        "less:all", 
        "cssmin:base"
    ]);

    grunt.registerTask( "devUpdateJS", [
        "concat:js", 
        "concat:libjs"
    ]);

    grunt.registerTask("build", [
        "devUpdateCSS", 
        "devUpdateJS"
    ]);

    grunt.registerTask("release", [
        "build", 
        "uglify:base", 
        "closure-compiler"
    ]); 

    grunt.registerTask('default', [
        'build'
    ]);


};
