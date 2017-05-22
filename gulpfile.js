var gulp = require('gulp'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    less = require('gulp-less');
 
var gulpStylelint = require('gulp-stylelint');

var gulpEslint = require('gulp-eslint');

gulp.task('css-lint', function () {
    return gulp.src('dist/css/*.css')
    .pipe(gulpStylelint({
      failAfterError: false,
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});

gulp.task('es-lint', () => { 
    return gulp.src(['dist/js/*.js','node_modules']) 
        .pipe(gulpEslint())
        .pipe(gulpEslint.format()) 
        .pipe(gulpEslint.failAfterError());
});

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

gulp.task("default",["build","copy","less","es-lint"]);
