module.exports = { 
    js: {
		files: 'app/js/app/**/*.js',
		tasks: 'devUpdateJS'
	},
	css: {
		files: 'app/css/**/*.less',
		tasks: 'devUpdateCSS'
	},
	data : {
		files : "data/pages.json",
		tasks : ["devUpdateJSON", "devUpdateHTML"]
	},
	html : {
		files : 'app/tpl/**/*.hbs',
		tasks : "devUpdateHTML",
		options: {
			nospawn: true
		}
	},
	sprite : {
		files : 'app/img/sprites/*.png',
		tasks : "devUpdateSprite"
	}
}