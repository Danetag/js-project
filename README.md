# grunt-init jsproject

> Create a basic js project [grunt-init][].

[grunt-init]: http://gruntjs.com/project-scaffolding

## Author

- Twitter   : [@Danetag](https://twitter.com/danetag)
- Portfolio : [Cargo Collective](http://cargocollective.com/danetag)
- LinkedIn  : [LinkedIn](fr.linkedin.com/in/danetag/en)

## Installation
If you haven't already done so, install [grunt-init][].

Once grunt-init is installed, place this template in your `~/.grunt-init/` directory. It's recommended that you use git to clone this template into that directory, as follows:

```
git clone https://github.com/Danetag/js-project.git ~/.grunt-init/jsproject
```

_(Windows users, see [the documentation][grunt-init] for the correct destination directory path)_

## Usage

At the command-line, cd into an empty directory, run this command and follow the prompts.

```
grunt-init jsproject
```

Once the project is generated, please use the build task

```
grunt build
```

or basically

```
grunt
```

## Featuring

This project uses grunt.js featuring [LESS](http://lesscss.org/), [Handlebars](http://handlebarsjs.com/), [Google Closure Tools](https://developers.google.com/closure/)

## Requirements

This project uses [grunt-spritesmith](https://github.com/Ensighten/grunt-spritesmith), a Grunt library for using [spritesmith](https://github.com/Ensighten/spritesmith), a spritesheet and CSS pre-processor utility.

Spritesmith supports multiple sprite engines however all of the current engines require external software to be installed.

As a result, you must either have [PhantomJS](http://phantomjs.org/) installed for Spritesmith to run properly. 

You just have to install PhantomJS through npm

```
npm install -g phantomjs
```

## Handlebars

HTML is directly generated thanks to Handlebars from .hbs files. All datas come from data/pages.json. This file describes every page of the project. For each page, you can add content values, as partials used. There's a common section as well describing the shared objects for a common layout - CSS, JS, partials.

## LESS