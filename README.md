# JS Project
## Description

JS Project template using grunt.js


## Setup 

It requires node v0.8+, grunt v0.3.5+ and npm.

`npm install grunt -g` - installs grunt as global
`npm install` - installs all dependencies


## Grunt Tasks

- `grunt watch` will monitor all templates, data files, CSS and JS for changes and rebuild everything to your build directory when changes are detected.
- `grunt template` will build all templates to HTML
- `grunt build` will build all templates, and the CSS and JS bundles


## Less

All of our CSS is preparsed with Less. If you add a new Less file, be sure to update the concat:less task in grunt.js to include it.
