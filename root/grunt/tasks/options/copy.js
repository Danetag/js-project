module.exports = { 
    vendor: {
		files: [
			{expand: true, cwd: 'app/js/vendor/', src: ['**'], dest: 'dist/js/vendor/', filter: 'isFile'}, // includes files in path
		]
	},
	phpInclude : {
		files: [
			{expand: true, cwd: 'app/include_php/', src: ['**'], dest: 'dist/include_php/', filter: 'isFile'}, // includes files in path
		]
	},
	img: {
		files: [
			{expand: true, cwd: 'app/img/', src: ['**'], dest: 'dist/img/', filter: 'isFile'}, // includes files in path
		]
	},
	mobile : {
		files: [
			{expand: true, cwd: 'app/m/', src: ['**'], dest: 'dist/m/', filter: 'isFile'}, // includes files in path
		]
	},
	font : {
		files: [
			{expand: true, cwd: 'app/css/font/', src: ['**'], dest: 'dist/css/font/', filter: 'isFile'}, // includes files in path
		]
	}
}