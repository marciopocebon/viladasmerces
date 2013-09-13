module.exports = function( grunt ){
	grunt.initConfig({
		pkg	: grunt.file.readJSON( 'package.json' ),
		concat : {
			backend : {
				src 	: [ 'backend/libs/src/*.js' ],
				dest 	: 'backend/libs/build/concat.js'
			},
			frontend : {
				src 	: [ 'frontend/libs/src/*.js' ],
				dest 	: 'frontend/libs/build/concat.js'
			}
		},
		uglify : {
			backend : {
				files : {
					'backend/libs/min/uglify.min.js' : [ '<%= concat.backend.dest %>' ]
				}
			},
			frontend : {
				files : {
					'frontend/libs/min/uglify.min.js' : [ '<%= concat.frontend.dest %>' ]
				}
			}
		},
		watch : {
			files : [ 'backend/routes/*' ],
			tasks : [ '<%= pkg.scripts.stop %>' ]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask( 'default', ['concat', 'uglify'] );
	grunt.registerTask( 'backend', ['concat:backend', 'uglify:backend'] );
	grunt.registerTask( 'frontend', ['concat:frontend', 'uglify:frontend'] );
};