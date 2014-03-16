'use strict';

var tools = require("./tools").tools;

var _initLang = function()
{
    var aFolderLang = tools.findSubFiles('./data/trad/*');

    var aLang = [];

    for(var i in aFolderLang)
    {
        var dir      = aFolderLang[i];
        var lang     = dir.replace("./data/trad/", "");
        var contents = tools.findSubFiles( dir + '/**/*.json');

        aLang.push({ lang : lang, dir : dir, contents : contents });
    }

    //console.log("aLang", aLang)

    global.GRUNT.aLang = aLang;
}

var _initTranslate = function()
{
    //translate.translateJS[lang]
    //translate.translateHTML[lang];

    var nameFileTranslateJS   = "translate_js.json";
    var nameFileTranslateHTML = "translate_html.json";

    var translate = { translateJS : [], translateHTML : [] };

    for(var i in global.GRUNT.aLang)
    {
        var oLang = global.GRUNT.aLang[i];

        var files = oLang.contents;

        for(var j in files)
        {
            var file = files[j];

            //Translate JS
            if( file.replace( oLang.dir + "/", "") ==  nameFileTranslateJS)
            {
                translate.translateJS[oLang.lang] = global.GRUNT.grunt.file.readJSON(file);
            }

            //Translate HTML
            if( file.replace( oLang.dir + "/", "") ==  nameFileTranslateHTML)
            {
                translate.translateHTML[oLang.lang] = global.GRUNT.grunt.file.readJSON(file);
            }
        }
    }

    global.GRUNT.translate = translate;
}

var _initPages = function()
{

    var tplFiles = [];

    for (var i in global.GRUNT.pages)
    {
        var page    = global.GRUNT.pages[i];
        var data    = tools.getContents(page.name);

        tplFiles.push( { 
            id        : page.id,
            name      : page.name,
            src       : page.tpl, 
            output    : page.output, 
            route     : page.route, 
            priority  : page.priority, 
            data      : data,
            jSVar     : page.jSVar          || {},
            partials  : page.partials       || {},
            hasLayout : page.hasLayout      || true,
            assets    : page.assets         || [],
            bodyClass  : page.bodyClass     || "",
            popupClass : page.popupClass    || ""
        });
    }

    global.GRUNT.tplFiles = tplFiles;

}

var _initMenu = function()
{
    var nameFileMenu   = "menu.json";

    var aMenu = [];

    for(var i in global.GRUNT.aLang)
    {
        var oLang = global.GRUNT.aLang[i];

        var files = oLang.contents;

        for(var j in files)
        {
            var file = files[j];

            if( file.replace( oLang.dir + "/", "") ==  nameFileMenu)
            {
                aMenu[oLang.lang] = global.GRUNT.grunt.file.readJSON(file);
            }
        }
    }

    global.GRUNT.menu = aMenu;

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
                menu[lang] = {};

            menu[lang][name] = { route : page.route[lang], label : page.data[lang].label };
        }
    }

    global.GRUNT.menu = menu;
}

var _initRoutes = function()
{
    var routes = { pages : {} };
    routes.primaryAssets = global.GRUNT.common.assets;

    for( var i in global.GRUNT.tplFiles)
    {
        var page  = global.GRUNT.tplFiles[i];

        if(page.id == "homepage")
            continue;

        var route = {};

        route.id    = page.id;

        if(page.jSVar != undefined)
            route.jSVar = page.jSVar;

        if(page.bodyClass != undefined)
            route.bodyClass = page.bodyClass;

        if(page.popupClass != undefined)
            route.popupClass = page.popupClass;

        for ( var lang in page.data)
        {
            var content  = page.data[lang];
            route[lang] = { 
                route   : page.route[lang], 
                label   : content.label, 
                assets  : page.assets, 
                assetsMemoryless  : page.assetsMemoryless, 
                title   : content.meta.title, 
                name    : page.name 
            };   
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

    //add new items in the begining of the array

    global.GRUNT.jsfiles.dist.unshift( { src : '/js/'+ global.GRUNT.pkg.namespace +'.min.js'} );

    global.GRUNT.jsfiles.app.unshift(  { src : '/js/'+ global.GRUNT.pkg.namespace +'.lib.js'} );
    global.GRUNT.jsfiles.app.unshift(  { src : '/js/'+ global.GRUNT.pkg.namespace +'.libIE.js'} );

    global.GRUNT.jsfiles.dist.unshift( { src : '/js/'+ global.GRUNT.pkg.namespace +'.lib.min.js'} );
    global.GRUNT.jsfiles.dist.unshift( { src : '/js/'+ global.GRUNT.pkg.namespace +'.libIE.min.js'} );

    

    global.GRUNT.jsfiles.aScriptOnlyIE = [  
        { src : '/js/'+ global.GRUNT.pkg.namespace +'.lib.js', ie : '/js/'+ global.GRUNT.pkg.namespace +'.libIE.js' } ,
        { src : '/js/'+ global.GRUNT.pkg.namespace +'.lib.min.js', ie : '/js/'+ global.GRUNT.pkg.namespace +'.libIE.min.js' } ,
    ]

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
        },
        libIEjs : {
            app  : 'app/js/'+ global.GRUNT.pkg.namespace +'.libIE.js',
            dist : 'dist/js/'+ global.GRUNT.pkg.namespace +'.libIE.min.js'
        }
    };
}

var project = function () 
{

    this.init = function()
    {
        _initLang();
        _initTranslate();
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
