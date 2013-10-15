'use strict';

module.exports = function(grunt) {

    var Handlebars   = require('handlebars');
    var tools 		 = require("../tools").tools;
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

        for(var i in files)
        {
            var file     = files[i];
            var template = Handlebars.compile( grunt.file.read( common.tplSrc + file.src) );

            /* Partial */

            //Common
            if( file.hasLayout)
            {
                for(var key in common.partial)
                {
                    Handlebars.registerPartial("partial." + key, grunt.file.read( common.tplSrc + common.partial[key] ) );    
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

         
            /* output by Language */

            for( var lang in file.data)
            {
                var data = file.data[lang];

                /* CSS/JS */
                data.aCSS    			= cssfiles.app;
                data.aJS     			= jsfiles.app;

                data.baseURL 			= common.baseURL;

                data.dirnameApp 		= __dirname + "/app/";
                data.dirnameDist 		= __dirname + "/dist/";

                data.translateJS       	= translate.translateJS[lang];
                data.nbItemtranslateJS 	= translate.translateJS[lang].length - 1;

                data.translate   		= translate.translateHTML[lang];

                data.nbScripts   		= data.aJS.length - 1;

                data.lang    			= lang;
                data.menu    			= global.GRUNT.menu[lang];


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

                    //next
                    var idxNext  =  idxCard+1;

                    if( idxNext > nbCards)
                    {
                        idxNext = 1;
                    }  

                    var nextCard  = tools.getPageInJSON("card" + idxNext);
                    data.nextCard = nextCard.data[lang];

                }

                var output   = template( data );

                //app
                grunt.file.write( "app/" + file.output[lang], output);

                if( context == "dist" ) // Build
                {
                    /* CSS/JS */
                    data.aCSS    			= cssfiles.dist;
                	data.aJS     			= jsfiles.dist;
                    data.nbScripts       	= data.aJS.length - 1;

                    var outputDist   		= template( data ); 

                    grunt.file.write( "dist/" + file.output[lang], outputDist);
                    console.log( "dist/" + file.output[lang] + " generated");

                }   

                console.log( "app/" + file.output[lang] + " generated");


            }

        }   

    });

};
