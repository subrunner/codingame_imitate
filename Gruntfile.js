const sass = require('node-sass');

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    eslint: {
      options: {
        fix: true
      },
      target: ['htmlpage/js/**/*.js', '!htmlpage/js/lib/**/*.js']
    },
    sass: {
      options: {
        sourceMap: true,
        implementation: sass
      },
      scss: {
        files: [{
          expand: true,
          cwd: "htmlpage/js",
          dest: "htmlpage/js",
          src: ["**/*.scss"],
          ext: ".css"
        }]
      }
    }
  });

  grunt.registerTask('default', ['eslint', 'sass']);
}