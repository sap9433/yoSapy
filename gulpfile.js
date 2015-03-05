var gulp = require('gulp');
var jasmine = require('gulp-jasmine');

gulp.task('test', function test() {
    return gulp.src('test/test1.js')
        .pipe(jasmine());
});
