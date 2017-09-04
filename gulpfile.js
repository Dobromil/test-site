var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var webpack = require('webpack');

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

/// sripts webpack
gulp.task('scripts', function(callback){
  webpack(require(__dirname + '/webpack.config.js'), function(err, stats){
  	if (err){
  		console.log(err.toString());
  	};
  	console.log(stats.toString());
  	callback();
  	browserSync.reload();  
  });
});


/// watch 
gulp.task('sass:watch', function () {
  browserSync.init({
   server: {
   	baseDir: "app"
   }
  });

  gulp.watch('./app/assets/sass/**/*.scss', ['sass']);
  gulp.watch(['./app/*.html'], ['html']);
  gulp.watch('./app/assets/scripts/**/*.js', ['scripts']);
});

gulp.task('default', [ 'sass:watch']);