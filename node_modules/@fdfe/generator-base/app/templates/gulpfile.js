var gulp = require('gulp'),
    useref = require('gulp-useref'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    minifyCss = require('gulp-minify-css'),
    minifyHTML = require('gulp-minify-html');

gulp.task('useref', function () {
    var assets = useref.assets();

    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

gulp.task('css', ['useref'], function () {
    return gulp.src('dist/*.css')
        .pipe(rev())
        .pipe(minifyCss())
        .pipe(gulp.dest('dist'))
        .pipe( rev.manifest() )
        .pipe( gulp.dest( 'rev/css' ) );
});

gulp.task('icon', function () {
    return gulp.src('./app/assets/images/favicon.ico')
    .pipe( gulp.dest( 'dist' ));
});

gulp.task('scripts', ['useref'], function () {
    return gulp.src('dist/js/*.js')
        .pipe(rev())
        .pipe(gulp.dest('dist/js'))
        .pipe( rev.manifest() )
        .pipe( gulp.dest( 'rev/js' ) );
});

gulp.task('build', ['css', 'icon', 'scripts'], function () {
    return gulp.src(['rev/**/*.json', 'dist/*.html'])
        .pipe( revCollector({
            replaceReved: true,
            dirReplacements: {
                'css': './css',
                '/js/': './js/'
            }
        }) )
        .pipe( minifyHTML({
            empty:true,
            spare:true
        }) )
        .pipe( gulp.dest('dist') );
});

