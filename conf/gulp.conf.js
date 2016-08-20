/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

const _ = require('lodash');
const path = require('path');
const gutil = require('gulp-util');

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
	src: 'src',
	dist: 'dist',
	tmp: '.tmp',
	e2e: 'e2e'
};

exports.path = _.mapValues(exports.paths, (pathValue, pathName) => {
	return function pathJoin() {
		const pathValue = exports.paths[pathName];
		const funcArgs = Array.prototype.slice.call(arguments);
		const joinArgs = [pathValue].concat(funcArgs);
		return path.join.apply(this, joinArgs);
	};
});

console.log('coucou', exports.path);

if (process.env.CI === 'true') {
	exports.paths = {
		src: 'testGulpTasks/fixture/src',
		dist: 'testGulpTasks/build/dist',
		tmp: 'testGulpTasks/build/.tmp',
		e2e: 'testGulpTasks/fixture/e2e'
	};
}

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function (title) {
	return function (err) {
		gutil.log(gutil.colors.red(`[${title}]`), err.toString());
		this.emit('end');
	};
};
