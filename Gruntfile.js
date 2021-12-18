module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    eslint: {
      options: {
				fix: true
			},
      target: ['htmlpage/js/**/*.js', '!htmlpage/js/lib/**/*.js']
    }
  });

  grunt.registerTask('default', ['eslint']);
}