// This is the main application configuration file.  It is a Grunt
// configuration file, which you can learn more about here:
// https://github.com/cowboy/grunt/blob/master/docs/configuring.md
//
module.exports = function(grunt) {
  var SRC_CSS   = 'app/css/src/',
      SRC_JS    = 'app/js/src/',
      SRC_TPL   = 'app/tpl/',

      BUILD_CSS = 'bin/css/',
      BUILD_JS  = 'bin/js/',
      BUILD_TLP = 'bin/', 

      im = require( 'imagemagick' ),
      _ = require( 'underscore' ),
      prompt = require( 'prompt' ),
      VERSION = grunt.file.readJSON('package.json').version,
      templateData = _.extend( grunt.file.readJSON('data/common.json'), {'version': VERSION } )

  prompt.message = '[' + '?'.green + ']';
  prompt.delimiter = ' ';

  grunt.initConfig({
    pkg: '<json:package.json>',

    // The lint task will run the build configuration and the application
    // JavaScript through JSHint and report any errors.  You can change the
    // options for this task, by reading this:
    // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md
    lint: {
      files: [
        "app/js/src/**/*.js"
      ]
    },

    // The jshint option for scripturl is set to lax, because the anchor
    // override inside main.js needs to test for them so as to not accidentally
    // route.
    jshint: {
      options: {
        scripturl: true
      }
    },

    // This task uses the MinCSS Node.js project to take all your CSS files in
    // order and concatenate them into a single CSS file named index.css.  It
    // also minifies all the CSS as well.  This is named index.css, because we
    // only want to load one stylesheet in index.html.
    mincss: {
      base: {
        src: BUILD_CSS + 'project.css',
        dest: BUILD_CSS + 'project.min.css'
      }
    },

    // Takes the built require.js file and minifies it for filesize benefits.
    min: {
      base: {
        src: BUILD_JS + 'project.js',
        dest: BUILD_JS + "project.min.js"
      }
    },
    less: {
      base: {
        src: BUILD_CSS + 'project.less',  
        dest: BUILD_CSS + 'project.css'
      }
    },
    watch: {
      js: {
        files: ['<config:concat.js.src>'],
        tasks: 'devUpdateJS'
      },
      css: {
        files: ['<config:concat.less.src>'],
        tasks: 'devUpdateCSS'
      },
      template: {
        files: [SRC_TPL + '*.dust', SRC_TPL + 'shared/*.dust', SRC_TPL + '../data/*.json'],
        tasks: 'template'
      }
    },

    concat: {
      less: {
       src: [
              SRC_CSS + '**/*.less',
              ], 
        dest: BUILD_CSS + 'project.less'
      },
      js: {
        src: [
            SRC_JS + 'src/**/*.js',
            SRC_JS + 'lib/**/*.js'
        ],
        dest: BUILD_JS + 'project.js'
      }
    },
    // The template task takes a src template and generates a cached HTML page from it
    // include variable objects to make them available to the template
    template: {
      index: {
        src: SRC_TPL + 'index.dust',
        dest: BUILD_TLP + 'index.html',
        variables: _.extend( grunt.file.readJSON(SRC_TPL + '../data/common.json'), {preserveWhiteSpace: true}, {'version': VERSION })
      }
     
    }
  } );
  

  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-css');
  grunt.loadNpmTasks('grunt-templater');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-shell');


  // Update CSS for dev
  grunt.registerTask( "devUpdateCSS", "concat:less less" );

  // Update JS for dev
  grunt.registerTask( "devUpdateJS", "concat:js" );

  // Build the Templates, JS, and CSS
  grunt.registerTask( "build", "template devUpdateCSS devUpdateJS");

};
