/*
 * grunt-init-jsproject
 *
 * Copyright (c) 2013 Arnaud Tanielian, contributors
 * Licensed under the MIT license.
 */

'use strict';

var exec = require('child_process').exec, 
    fs = require('fs'),
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
        validator: /^[A-Za-z]{0,9}$/,
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
    var excludedFiles = {};
    
    for(var key in files)
    {
        var file = files[key];

        if( file.indexOf(".jar") != -1 || file.indexOf(".png") != -1 || file.indexOf(".jpg") != -1 || file.indexOf(".gif") != -1 )
        {
            excludedFiles[key] = file;
            delete files[key];
        }
        
    }

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Only copy excluded files.
    for(var src in excludedFiles)
    {
        init.copy(src);
    }

    //REPLACE NAMESPACE
    var destPath = init.destpath() + "/app/" ;
    var filesToReplace = [], 
        indexFinal     = 0,
        filesFinal     = [],
        fReadDirSync   = fs.readdirSync(destPath);

    //add the final path
    for(var i in fReadDirSync)
    {
        var f = fReadDirSync[i];
        f     = destPath + f;
        filesToReplace.push( f );
    }

    var _replaceNamespace = function(fls)
    {
        //console.log("files", fls);

        for(var key in fls)
        {
            var fl = fls[key];

            //console.log("go to read :: " + fl);

            if( fs.lstatSync(fl).isDirectory() )
            {
                //console.log("is dir :: " +  fl);
                var filesToReplace = [], 
                    fReadDirSync   = fs.readdirSync( fl );

                for(var i in fReadDirSync)
                {
                    var f = fReadDirSync[i];
                    f     = fl + "/" + f;
                    filesToReplace.push( f );
                }

                //console.log("is dir " +fl+" and to replace in it ::", filesToReplace)

                if(filesToReplace.length)
                    _replaceNamespace(filesToReplace);

            }
            else
            {
                //console.log("is file to read :: " +  fl );

                //Isn't a directory
                if ( fl.indexOf(".hbs") != -1 || fl.indexOf(".js") != -1 ) {

                    filesFinal.push({path : fl, explored : false});

                }
            }

            /*
            fs.readFile(fl, 'utf8', function (err,data) {

                console.log("reading :: " , flO);

                if( flO.explored )
                    return;

                flO.explored = true;

                if (err) {
                    //return console.log("error reading on " + fl, err);
                }

                var result = data.replace("/JSP/g", props.namespace);

                    fs.writeFile(fl, result, 'utf8', function (err) {
                        if (err) return console.log("error writing on " + fl, err);
                    });

                

            });
            */

            
        }


    }

    
    _replaceNamespace(filesToReplace);
    

    console.log("filesFinal", filesFinal)

    var _readFile = function()
    {
        var f  = filesFinal[indexFinal];
        var fl = f.path;

        fs.readFile(fl, 'utf8', function (err,data) {

            console.log("reading :: " , fl);

            if( f.explored )
                return;

            f.explored = true;

            if (err) {
                return console.log("error reading on " + fl, err);
            }

            
            var myRegex = /JSP/;

            if (myRegex.test(data)) {

                console.log("replacing ... ", props.namespace);
                
                var result = data.replace("/JSP/", props.namespace);

                fs.writeFile(fl, result, 'utf8', function (err) {

                    indexFinal++;

                    if( indexFinal < filesFinal.length)
                       _readFile();

                    if (err) return console.log("error writing on " + fl, err);


                });

            }

        });
    }
    
    _readFile();


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
            "grunt-spritesmith"     : "x",
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

   

    /*    
    // Install all the npm modules necessary
    console.log("Installing npm modules...");

    exec("npm install --save-dev", function(error,stdout,stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        }
        done();
    });
    */


  });

};
