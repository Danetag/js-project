'use strict';

var tools = require("./tools").tools;

var _initPages = function()
{

	var tplFiles = [];

	for (var i in global.GRUNT.pages)
    {
        var page = global.GRUNT.pages[i];

        tplFiles.push( { 
            id        : page.id,
            name      : page.name,
            src       : page.tpl, 
            output    : page.output, 
            route     : page.route, 
            priority  : page.priority, 
            data      : global.GRUNT.content[page.name],
            jSVar     : page.jSVar     || {},
            partials  : page.partials  || {},
            hasLayout : page.hasLayout || true,
            assets    : page.assets    || [],
            bodyClass : page.bodyClass || ""
        });
    }

    global.GRUNT.tplFiles = tplFiles;

}

var _initMenu = function()
{
	var menu = [];

	for(var lang in global.GRUNT.menu)
    {   
        var names = global.GRUNT.menu[lang];

        for(var j in names)
        {
            var name  = names[j];
            var page  = tools.getPageInJSON(name);

            if(page.data[lang] == undefined)
                continue; //homepage

            if(menu[lang] === undefined)
                menu[lang] = [];

            menu[lang].push( { route : page.route[lang], label : page.data[lang].label } )
        }
    }

    global.GRUNT.menu = menu;
}

var _initRoutes = function()
{
	var routes = { pages : {} };

    for( var i in global.GRUNT.tplFiles)
    {
        var page  = global.GRUNT.tplFiles[i];
        var route = {};
        route.id = page.id;

        for ( var lang in page.data)
        {
        	var content  = page.data[lang];
        	route[lang] = { route : page.route[lang], label : content.label, assets : page.assets, title:content.meta.title, name : page.name };   
        }



        routes.pages[page.name] = route;

    }

    
    global.GRUNT.routes = routes;
}

var _initSitemap = function()
{
    var sitemap = [];

    for( var i in global.GRUNT.tplFiles)
    {
        var page = global.GRUNT.tplFiles[i];

        for( var lang in page.data)
        {
            sitemap.push({
                loc      : page.route[lang],
                priority : page.priority
            });
        }

    }

    global.GRUNT.sitemap = sitemap;
    
}


var _initCSS = function()
{
    global.GRUNT.cssfiles.app.unshift(  { src : '/css/'+ global.GRUNT.pkg.namespace +'.css' } );
    global.GRUNT.cssfiles.dist.unshift( { src : '/css/'+ global.GRUNT.pkg.namespace +'.min.css'} );
}

var _initJS = function()
{
    // Concat JS
    var JStoConcat = [];
    for(var i in global.GRUNT.jsfiles.app)
    {
        JStoConcat.push( "app" + global.GRUNT.jsfiles.app[i].src );
    }

    global.GRUNT.jsfiles.concat = JStoConcat;

    global.GRUNT.jsfiles.app.unshift(  { src : '/js/'+ global.GRUNT.pkg.namespace +'.lib.js'} );
    global.GRUNT.jsfiles.dist.unshift( { src : '/js/'+ global.GRUNT.pkg.namespace +'.lib.min.js'} );
    global.GRUNT.jsfiles.dist.unshift( { src : '/js/'+ global.GRUNT.pkg.namespace +'.min.js'} );

}

var _initConfigScripts = function()
{
    global.GRUNT.configScripts = 
    {
        css : {
            app  : 'app/css/'+ global.GRUNT.pkg.namespace +'.css',
            dist : 'dist/css/'+ global.GRUNT.pkg.namespace +'.min.css'
        },
        js : {
            app  : 'app/js/'+ global.GRUNT.pkg.namespace +'.js',
            dist : 'dist/js/'+ global.GRUNT.pkg.namespace +'.min.js'
        },
        libjs : {
            app  : 'app/js/'+ global.GRUNT.pkg.namespace +'.lib.js',
            dist : 'dist/js/'+ global.GRUNT.pkg.namespace +'.lib.min.js'
        }
    };
}

var project = function () 
{

	this.init = function()
    {
		_initPages();
		_initMenu();
		_initRoutes();
        _initCSS();
        _initJS();
        _initConfigScripts();
        _initSitemap();
	}
}


exports.project = new project()
