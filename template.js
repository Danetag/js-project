/*
 * grunt-init-jsproject
 *
 * Copyright (c) 2013 Arnaud Tanielian, contributors
 * Licensed under the MIT license.
 */

'use strict';

var exec = require('child_process').exec, 
    child;

// Basic template description.
exports.description = 'Create a base js project';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'Basic JS project made by Danetag.';

// Template-specific notes to be displayed after question prompts.
// exports.after = 'The bash should now install all the npm dependencies';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({type: 'jsproject'}, [
    
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('title'),
    {
        name: 'namespace',
        message: 'Namespace of the project',
        default: 'NS', 
        validator: /^[A-Z]{0,9}$/,
        warning: 'Must be only letters, max 9'
    },
    init.prompt('description'),
    init.prompt('version'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses', 'MIT'),
    init.prompt('author_name'),
    init.prompt('author_email'),
    init.prompt('author_url'),
    init.prompt('jquery_version', '1.9.1')

  ], function(err, props) {

    props.keywords = [];
    
    // Files to copy (and process).
    var files = init.filesToCopy(props);

    //get excluded files.. And exclude them
    console.log(files);

    return;

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props, function( pkg, props ){

        pkg.namespace        = props.namespace;
        pkg.css_preprocessor = props.css_preprocessor;
        pkg.jquery_version   = props.jquery_version;

        var devDependencies = {
            "grunt"      : "x",
            "matchdep"   : "x",
            "handlebars" : "x",
            "grunt-css"  : "x",
            "grunt-contrib-watch"   : "x", 
            "grunt-contrib-concat"  : "x", 
            "grunt-contrib-uglify"  : "x", 
            "grunt-contrib-less"    : "x", 
            "grunt-contrib-htmlmin" : "x", 
            "grunt-contrib-copy"    : "x", 
            "grunt-contrib-cssmin"  : "x", 
            "grunt-closure-compiler": "x", 
        };

        pkg.devDependencies = devDependencies;
        return pkg;
    });

    // Install all the npm modules necessary
    console.log("Installing npm modules...");

    exec("npm install --save-dev", function(error,stdout,stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        done();
    });

  });

};