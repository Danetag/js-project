module.exports = { 
    frontend: {
		closurePath: 'compiler/jar',
		js: global.GRUNT.configScripts.js.app, 
		jsOutputFile: global.GRUNT.configScripts.js.dist, 
		maxBuffer: 500,
		options: {
			compilation_level: 'SIMPLE_OPTIMIZATIONS',
			language_in: 'ECMASCRIPT5_STRICT',
			externs: {
				files : [
					'compiler/externs/jquery-1.8.js',
					'compiler/externs/underscore-1.3.1.js'
				]
			}
		}
	}
}