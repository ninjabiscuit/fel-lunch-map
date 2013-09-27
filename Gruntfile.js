module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    sass: {
      dist: {
        options: {
          sourcemap : true,
          style: "compressed",
        },
        files: {
          'public/css/main.css': 'public/css/sass/main.scss'
        }
      }
    },
    watch: {
      scripts: {
        files: ['public/css/sass/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
        },
      },
    },
    requirejs: {
      compile: {
        options: {
          appDir: "public",
          dir: "build",
          optimize: "uglify",
          baseUrl: "javascripts",
          mainConfigFile: "public/javascripts/main.js",
          almond:true,
          preserveLicenseComments: false,
          pragmasOnSave: {
            excludeTpl: true
          },
          fileExclusionRegExp: /^tests$/,
          modules: [
            {
              name: "main"
            }
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Default task(s).
  grunt.registerTask('default', ['sass']);

};