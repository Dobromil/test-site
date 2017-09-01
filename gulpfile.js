var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();


/////

gulp.task('sass', function () {
  return gulp.src('./app/assets/sass/**/*.scss')
  	.pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .on('error', function(errorInfo){
    	console.log(errorInfo.toString());
    	this.emit('end');
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./app/assets/styles/'))
    .pipe(browserSync.stream());
});

gulp.task('html', function () {
  browserSync.reload();   
});
 
gulp.task('sass:watch', function () {
  
  browserSync.init({
   server: {
   	baseDir: "app"
   }
  });

  gulp.watch('./app/assets/sass/**/*.scss', ['sass']);
  gulp.watch(['./app/*.html'], ['html']);
});

gulp.task('default', [ 'sass:watch']);