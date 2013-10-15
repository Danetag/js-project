module.exports = { 
    all : {

        // Sprite files to read in
        'src':     'app/img/sprite/*.png',

        // Location to output spritesheet
        'destImg': 'app/img/sprite.png',

        // Stylus with variables under sprite names
        'destCSS': 'app/css/less/sprite.less',

        // OPTIONAL: Manual override for imgPath specified in CSS
        //'imgPath': '../sprite.png',

        // OPTIONAL: Specify algorithm (top-down, left-right, diagonal [\ format],
        // alt-diagonal [/ format], binary-tree [best packing])
        'algorithm': 'binary-tree',

        // OPTIONAL: Specify engine (auto, canvas, gm)
        'engine': 'phantomjs',

        // OPTIONAL: Specify CSS format (inferred from destCSS' extension by default)
        // (stylus, scss, sass, less, json, css)
        'cssFormat': 'less',

        // OPTIONAL: Specify settings for engine
        'engineOpts': {
            'imagemagick': true
        },

        // OPTIONAL: Specify img options
        'imgOpts': {
            // Format of the image (inferred from destImg' extension by default) (jpg, png)
            'format': 'png',

            // Quality of image (gm only)
            //'quality': 90
        },

        // OPTIONAL: Specify css options
        'cssOpts': {
            // Some templates allow for skipping of function declarations
            'functions': false
        }

    },
    at2x : {

        // Sprite files to read in
        'src':     'app/img/sprite@2x/*.png',

        // Location to output spritesheet
        'destImg': 'app/img/sprite@2x.png',

        // Stylus with variables under sprite names
        'destCSS': 'app/css/less/sprite@2x.less',

        // OPTIONAL: Manual override for imgPath specified in CSS
        //'imgPath': '../sprite.png',

        // OPTIONAL: Specify algorithm (top-down, left-right, diagonal [\ format],
        // alt-diagonal [/ format], binary-tree [best packing])
        'algorithm': 'binary-tree',

        // OPTIONAL: Specify engine (auto, canvas, gm)
        'engine': 'phantomjs',

        // OPTIONAL: Specify CSS format (inferred from destCSS' extension by default)
        // (stylus, scss, sass, less, json, css)
        'cssFormat': 'less',

        // OPTIONAL: Specify settings for engine
        'engineOpts': {
            'imagemagick': true
        },

        // OPTIONAL: Specify img options
        'imgOpts': {
            // Format of the image (inferred from destImg' extension by default) (jpg, png)
            'format': 'png',

            // Quality of image (gm only)
            //'quality': 90
        },

        // OPTIONAL: Specify css options
        'cssOpts': {
            // Some templates allow for skipping of function declarations
            'functions': false
        }

    } 
}