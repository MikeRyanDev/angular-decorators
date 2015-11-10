var gulp = require('gulp');
var babel = require('gulp-babel');
var mocha = require('gulp-mocha');

gulp.task('transpile', function () {
	return gulp.src('src/**/*.js')
		.pipe(babel({
			stage: 0
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('build', ['transpile'], function () {
	return gulp.src('src/index.d.ts')
		.pipe(gulp.dest('dist'));
});

gulp.task('test', ['build'], function (done) {
	return gulp.src('dist/**/*.spec.js')
		.pipe(mocha({ reporter: 'spec' }));
});

gulp.task('default', function(){
	gulp.watch('./src/**/*.js', ['test']);
});
