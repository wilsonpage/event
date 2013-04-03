
/**
 * Module Dependencies
 */

var browserify = require('browserify');

/**
 * Exports
 */

module.exports = function (grunt) {

	grunt.registerTask('browserify', function() {
		var done = this.async();
		var b = browserify(__dirname + '/../lib/event.js');
		b.bundle({ standalone: grunt.config.data.pkg.name }, function(err, string) {
			grunt.file.write('build/event.js', string);
			 grunt.log.writeln('Written build/event.js (' + String(string.length).green + ' bytes)');
			done();
		});
	});
};