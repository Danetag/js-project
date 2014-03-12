'use strict';

function loadConfig(path) {
    var glob = require('glob');
    var object = {};
    var key;

    glob.sync('*', {cwd: path}).forEach(function(option) {
        key = option.replace(/\.js$/,'');
        object[key] = require(path + option);
    });

    return object;
}

// # Globbing
module.exports = function (grunt) {

    // load all grunt tasks
    var test      = require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    global.GRUNT      = {}
    global.GRUNT.grunt      = grunt;
    var configOptions = {};

    configOptions.pkg       = grunt.file.readJSON('package.json');

    global.GRUNT.dirname    = __dirname;
    global.GRUNT.pkg        = grunt.file.readJSON('package.json');
    global.GRUNT.common     = grunt.file.readJSON('./data/common.json').common;
    global.GRUNT.jsfiles    = grunt.file.readJSON('./data/jsfiles.json').js;
    global.GRUNT.cssfiles   = grunt.file.readJSON('./data/cssfiles.json').css;
    global.GRUNT.pages      = grunt.file.readJSON('./data/pages.json').pages;

    //init some 
    var project = require("./grunt/project").project;
    project.init();

    grunt.util._.extend(configOptions, loadConfig('./grunt/tasks/options/'));
    grunt.initConfig(configOptions);

    grunt.loadTasks('./grunt/tasks');

};
