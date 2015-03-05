var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var istanbul = require('gulp-istanbul');

gulp.task('test', function test(coverage) {
    gulp.src(['app/*.js'])
        .pipe(istanbul())
        .on('finish', function(argument) {
            gulp.src(['test/*.js'])
                .pipe(jasmine())
                .pipe(istanbul.writeReports())
                .on('end', coverage);
        });
});
