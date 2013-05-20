/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    sass: {
      waynes: {
        files: {
         'waynesworld.css' : 'waynesworld.scss'
       }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task.
  grunt.registerTask('default', ['sass']);

};
