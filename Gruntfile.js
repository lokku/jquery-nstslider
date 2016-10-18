'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('nstSlider.jquery.json'),

    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.company %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',


    // Task configuration.
    clean: {
      files: ['dist']
    },

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true,
        process: function (src) {
            // remove test method
            return src.replace(/'_m'.+/g, "");
        }
      },
      dist: {
        src: ['src/jquery.<%= pkg.name %>.js'],
        dest: 'dist/jquery.<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/jquery.<%= pkg.name %>.min.js'
      }
    },

    qunit: {
      files: ['test/**/*.html'],
      all: {
          options: {
              urls: ['1.6.4', '1.7.0', '1.8.0', '1.9.0', '1.11.0', '2.0.0b1', '2.1.1-rc2', '3.1.0'].map(function(version) {
                  return 'http://localhost:<%= connect.server.options.port %>/test/nstSlider.html?jquery=' + version;
              })
          }
      }
    },

    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: 'src/.jshintrc'
        },
        src: ['src/**/*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      }
    },

    less: {
      development: {
        options: {
          compress: false,
          ieCompat: true,
//          dumpLineNumbers: 'all'
        },
        files: {
          // target.css file: source.less file
          "dist/jquery.nstSlider.css" : "src/jquery.nstSlider.less"
        }
      }
    },

    cssmin: {
      development: {
        options: {
        },
        files: {
          // target: source
          "dist/jquery.nstSlider.min.css" : "dist/jquery.nstSlider.css"
        }
      }
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      },
      styles: {
        files: ['src/*.less'],
        tasks: ['less','cssmin'],
        options: {
          nospawn: true
        }
      }
    },

    connect : {
        server: {
            options: {
                port: 8001
            }
        }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task
  grunt.registerTask('default', 'build:dev');

  // Build dev task
  grunt.registerTask('build:dev', ['jshint', 'clean', 'concat', 'uglify', 'less', 'cssmin']);

  // Test task
  grunt.registerTask('test', ['connect', 'jshint', 'qunit']);


};
