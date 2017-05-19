var gulp = require('gulp'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    less = require('gulp-less');
 
gulp.task('less', function () {
    gulp.src('./src/styles/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
});

gulp.task("build", function(){
    browserify('src/main.js')
        .transform('babelify')
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task("copy",function(){
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task("default",["build","sass","less"]);
