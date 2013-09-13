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
			reloadServer : {
				options : {
					stdout: true
				},
				command : 'npm stop ; sleep 5 ; npm start ;',
			}
		},
		watch : {
			files : [ 'backend/routes/*' ],
			tasks : [ 'server' ]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-shell');

	grunt.registerTask( 'default', 	['concat', 'uglify'] );
	grunt.registerTask( 'backend', 	['concat:backend', 'uglify:backend'] );
	grunt.registerTask( 'frontend', ['concat:frontend', 'uglify:frontend'] );
	grunt.registerTask( 'server', 	['shell:reloadServer'] );
};