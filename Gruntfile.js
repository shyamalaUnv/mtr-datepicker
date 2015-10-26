module.exports = function(grunt) {

  grunt.initConfig({
	pkg : grunt.file.readJSON('package.json'),
      less: {
        development: {
          options: {
            paths: ["styles/"]
          },
          files: {
            "styles/css/main.css": "styles/less/main.less",
            "styles/css/default-theme.css": "styles/less/default-theme.less",
            "styles/css/clutterboard-theme.css": "styles/less/clutterboard-theme.less",
          }
        }
      },
     
      cssmin: {
        options: {
          shorthandCompacting: false,
          roundingPrecision: -1
        },
        target: {
          files: {
            'dist/mtr-datepicker.min.css': ['styles/css/main.css'],
            'dist/mtr-datepicker.default-theme.min.css': ['styles/css/default-theme.css'],
            'dist/mtr-datepicker.clutterboard-theme.min.css': ['styles/css/clutterboard-theme.css'],
          }
        }
      },

      uglify: {
        options: {
          beautify: true,
        },
        my_target: {
          files: {
            'dist/mtr-datepicker.min.js': ['scripts/mtr-datepicker.js']
          }
        }
      },

      // Append a timestamp to JS and CSS files which are located in 'index.html'
      cachebreaker: {
        dev: {
          options: {
            match: [
              // CSS
              'dist/mtr-datepicker.min.css', 
              'dist/mtr-datepicker.default-theme.min.css',

              // JS
              'dist/mtr-datepicker.min.js',
            ],
          },
          files: {
            src: ['index.html']
          }
        }
      },

      jsdoc : {
        dist : {
            src: ['scripts/*.js'],
            options: {
                destination: 'docs'
            }
        }
      },

      watch: {
        options: {
          livereload: true,
        },
        less: {
          options: {
            livereload: false
          },
          files: ['styles/less/*.less', 'scripts/*.js'],
          tasks: ['less', 'cssmin', 'uglify', 'notify:watch', 'cachebreaker', 'jsdoc'],
        },
      },

      connect: {
        server: {
          options: {
            port: 8080,
            hostname: '*',
          }
        }
      },

      notify_hooks: {
        options: {
          enabled: true,
          max_jshint_notifications: 5, // maximum number of notifications from jshint output
          title: "MTR Datepicker", // defaults to the name in package.json, or will use project directory's name
          success: false, // whether successful grunt executions should be notified automatically
          duration: 1 // the duration of notification in seconds, for `notify-send only
        }
      },

      notify: {
        watch: {
          options: {
            title: 'Watch Detected', 
            message: 'LESS and minification finished.',
          }
        }
      }

    });

    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-cache-breaker');
    grunt.loadNpmTasks('grunt-jsdoc-ng');
    grunt.loadNpmTasks('grunt-notify');

    grunt.task.run('notify_hooks');
    
    grunt.registerTask('default', ['less', 'cssmin', 'uglify', 'cachebreaker', 'jsdoc', 'connect', 'watch']);
    
};