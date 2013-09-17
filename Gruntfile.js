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
		shell: {
			startServer : {
				options: {
					stdout: true
				},
				command : '<%= pkg.scripts.start %>'
			}
		},
		watch : {
			files : [ 'backend/routes/*' ],
			tasks : [ 'backend' ]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-shell');

	grunt.registerTask( 'dev',	 	['shell:startServer'] );
	//grunt.registerTask( 'backend', 	['concat:backend', 'uglify:backend'] );
	//grunt.registerTask( 'frontend', ['concat:frontend', 'uglify:frontend'] );
};