module.exports = { 
	js: {
		src  : global.GRUNT.jsfiles.concat,
		dest : global.GRUNT.configScripts.js.app
	},
	libjs: {
		src: [
			'app/js/lib/*.js'
		],
		dest: global.GRUNT.configScripts.libjs.app
	},
	libIEjs: {
		src: [
			'app/js/libIE/*.js'
		],
		dest: global.GRUNT.configScripts.libIEjs.app
	}
}