module.exports = { 
    all: {
		src : [
			'app/css/less/reset.less',
			'app/css/less/font.less',
			'app/css/less/utilities.less',
			'app/css/less/general.less',
			'app/css/less/*.less'
		],
		dest: global.GRUNT.configScripts.css.app,
		options: {
			compress: false
		}
	}
}