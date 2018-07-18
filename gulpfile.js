var gulp        = require('gulp');
var sass        = require('gulp-sass');
var concat      = require('gulp-concat');
var rename      = require('gulp-rename');
var uglify      = require('gulp-uglify');
var imagemin    = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;


// Copy Index
gulp.task('index', function() {
  return gulp.src('app/index.html')
  .pipe(gulp.dest('dist'))
});


// Copy Fonts
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

// Sass task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('sass', function () {
    return gulp.src('app/scss/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
          stream:true
        }));
});

// Gulp Concat
gulp.task('concat', function() {
  return gulp.src(['app/js/*.js'])
    .pipe(concat('all.js'))
    //.pipe(gulp.dest('dist/js'))
    .pipe(rename('all-min.js'))
    .pipe(uglify('all-min.js'))
    .pipe(gulp.dest('dist/js'));
});

// Gulp Imagemin
gulp.task('imagemin', function(){
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images'))
});
 
// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    //watch files
    var files = [
    './*.css',
    './*.html',
    ];
 
    //initialize browsersync
    browserSync.init(files, {
    //browsersync with a php server
    //proxy: "localhost/clarityv2/",
    //notify: false

        server: {
            baseDir: 'dist'
        }

    });
});
 
// Default task to be run with `gulp`
gulp.task('default', ['index', 'browser-sync', 'sass', 'concat', 'fonts', 'imagemin'], function () {
//gulp.task('default', ['browser-sync', 'sass', 'concat','fonts', 'imagemin'], function () {
    gulp.watch("app/scss/**/*.scss", ['sass']);
    gulp.watch('app/*.html', browserSync.reload); 
    gulp.watch('app/js/**/*.js', browserSync.reload); 
}); 