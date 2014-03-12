'use strict';

module.exports = function(grunt) {

    var Handlebars   = require('handlebars');
    var tools        = require("../tools").tools;
    var changedFiles = {};
    var common       = global.GRUNT.common;
    var jsfiles      = global.GRUNT.jsfiles;
    var cssfiles     = global.GRUNT.cssfiles;
    var translate    = global.GRUNT.translate;

    /* NB cards */
    var nbCards = 0;
    for(var i in global.GRUNT.tplFiles)
    {
        var p = global.GRUNT.tplFiles[i];

        if(p.id == "card")
            nbCards++;
    }

    grunt.event.on('watch', function(action, filepath) {
        changedFiles = {};
        changedFiles[action] = filepath;
    });

    grunt.registerTask( "compileHTML", "Compile HTML from pages.json", function(){

        var files   =  global.GRUNT.tplFiles;
        var context = "dist";

        if( changedFiles.changed != undefined )
        {
            context = "app";

            for(var i in global.GRUNT.tplFiles) //No partial !
            {
                if( global.GRUNT.tplFiles[i].src == changedFiles.changed )
                {
                    files = [ global.GRUNT.tplFiles[i] ];
                    break;
                }
            }
        }


        _generateFiles({ files : files, context : context, forJSViews : true  }); // For JS Views
        _generateFiles({ files : files, context : context, forJSViews : false });  // Full HTML


    });

    var _generateFiles = function(options)
    {
        var files   = options.files;
        var context = options.context;

        console.log("---------------")

        for(var i in files)
        {
            var file     = files[i];
            var template = Handlebars.compile( grunt.file.read( common.tplSrc + file.src) );

            /* Partial */

            console.log("file", file.src)

            //Common
            if( file.hasLayout)
            {

                var partials = common.partial;

                if(options.forJSViews)
                {
                    partials = common.partialJS;
                }    

                for(var key in partials)
                {

                    var filenamePartial = common.tplSrc + partials[key];

                    Handlebars.registerPartial("partial." + key, grunt.file.read( filenamePartial ) );    
                }
            }

            //partial page
            for(var key in file.partials)
            {
                Handlebars.registerPartial("partial." + key, grunt.file.read( common.tplSrc + file.partials[key]) );    
            }

            /* End Partial */

            /* Helpers */

            Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {

                //console.log( v1, operator, v2 )
                switch (operator) {
                    case '==':
                        return (v1 == v2) ? options.fn(this) : options.inverse(this);
                        break;
                    case '===':
                        return (v1 === v2) ? options.fn(this) : options.inverse(this);
                        break;
                    case '<':
                        return (v1 < v2) ? options.fn(this) : options.inverse(this);
                        break;
                    case '<=':
                        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                        break;
                    case '>':
                        return (v1 > v2) ? options.fn(this) : options.inverse(this);
                        break;
                    case '>=':
                        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                        break;
                    default:
                        return options.inverse(this)
                        break;
                }
               
            });

            Handlebars.registerHelper("debug", function(optionalValue) {
                console.log("Current Context");
                console.log("====================");
                console.log(this);

                if (optionalValue) {
                    console.log("Value");
                    console.log("====================");
                    console.log(optionalValue);
                }
            });

            Handlebars.registerHelper('value_of', function(context, key, options) {
                return options.fn(context[key]);
            });

         
            /* output by Language */

            for( var lang in file.data)
            {
                var data = file.data[lang];

                /* CSS/JS */
                data.aCSS               = cssfiles.app;
                data.aJS                = jsfiles.app;

                data.baseURL            = common.baseURL;
                data.commonjSVar        = JSON.stringify(common.jSVar);

                data.dirnameApp         = global.GRUNT.dirname + "/app/";
                data.dirnameDist        = global.GRUNT.dirname + "/dist/";

                data.translateJS        = translate.translateJS[lang];
                data.nbItemtranslateJS  = translate.translateJS[lang].length - 1;

                data.translate          = translate.translateHTML[lang];

                data.cardInfos         = _getCardsInfos(lang);

                data.aScriptOnlyIE      = JSON.stringify(global.GRUNT.jsfiles.aScriptOnlyIE);

                data.nbScripts          = data.aJS.length - 1;

                data.lang               = lang;
                data.menu               = global.GRUNT.menu[lang];

                data.bodyClass          = file.bodyClass;

                if( file.id == "card" )
                {
                    //get current
                    var nameCard = file.name;
                    var idxCard  = parseInt( nameCard.replace("card", ''), 10 );

                    data.idxCard = idxCard;
                    data.nbCards = nbCards;
                    data.name    = nameCard;

                    //prev
                    var idxPrev  =  idxCard-1;

                    if( idxPrev <= 0)
                    {
                        idxPrev = nbCards;
                    }  

                    var prevCard  = tools.getPageInJSON("card" + idxPrev);
                    data.prevCard = prevCard.data[lang];
                    data.prevCard.route = prevCard.route[lang];

                    //next
                    var idxNext  =  idxCard+1;

                    if( idxNext > nbCards)
                    {
                        idxNext = 1;
                    }  

                    var nextCard  = tools.getPageInJSON("card" + idxNext);
                    data.nextCard = nextCard.data[lang];
                    data.nextCard.route = nextCard.route[lang];

                }


                var output              = template( data );

                
                if(file.output[lang] == undefined)
                {
                    console.log("-- !!! Please be sure to remove "+file.id+".hbs from the " + lang +"/ folder");
                }

                //app
                var url = _getURL( file.output[lang], options.forJSViews);
                grunt.file.write( "app/" + url, output);


                if( context == "dist" ) // Build
                {
                    /* CSS/JS */
                    data.aCSS               = cssfiles.dist;
                    data.aJS                = jsfiles.dist;
                    data.nbScripts          = data.aJS.length - 1;

                    var outputDist          = template( data ); 

                    grunt.file.write( "dist/" + url, outputDist);
                    console.log( "dist/" + url + " generated");

                }   

                console.log( "app/" + url + " generated");


            }

        }   
    }

    var _getURL = function(filename, forJSViews)
    {
        if(!forJSViews)
            return filename;

        var extension = filename.split('.').pop();
        filename      = filename.substr(0, filename.length - extension.length )

        return filename + "view." + extension;

    }

    var _getCardsInfos = function(lang)
    {
        var aCardInfos = {};

        for(var i in global.GRUNT.tplFiles)
        {
            var file = global.GRUNT.tplFiles[i];

            if( file.id.indexOf("card0") > -1 )
            {
                var card = {};

                //Card
                card.title                 = file.data[lang].content.title;
                card.nbCard                = file.jSVar.cardID;

                aCardInfos[file.id] = card;
            }
        }

        return JSON.stringify(aCardInfos);
    }

};
