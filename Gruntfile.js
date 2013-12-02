module.exports = function( grunt ){
	grunt.initConfig({
		pkg	: grunt.file.readJSON( 'package.json' ),
		concat : {},
		uglify : {},
		watch : {}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask( 'some', ['x:y'] );
};