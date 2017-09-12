var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var webpack = require('webpack');
var imagemin = require('gulp-imagemin');
var del = require('del');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');

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

/// Gulp Build

gulp.task('deleteProductionFolder', function(){
  return del('./docs');
});

gulp.task('previewProduction', function(){
  browserSync.init({
   server: {
   	baseDir: "docs"
   }
  });
});

/// Copy imortant files. Samo kopira fajlove u prod folder

//gulp.task('copyImpFiles',['deleteProductionFolder'], function(){
//	var pathToCopy = [
//		'./app/**/*',
//		'!.app/index.html',
//		'!.app/app.js',
//		'!.app/vendor.js',
//		'!./app/assets/images/**',
//		'!./app/assets/styles/**',
//		'!./app/assets/scripts/**',

//	]
//	return gulp.src(pathToCopy)
//	.pipe(gulp.dest('./docs'));
//}); // Doadati u bluid task 'copyImpFiles' 




gulp.task('compressImages', ['deleteProductionFolder'], function(){
  return gulp.src('./app/assets/images/**/*')
  	.pipe(imagemin({
  		progressive: true,
  		interlaced: true,
  		multipass: true
  	}))
  	.pipe(gulp.dest('./docs/assets/images'));
});


gulp.task('usemin', ['deleteProductionFolder'], function(){
	return gulp.src('./app/index.html')
	.pipe(usemin({
		css: [function(){return rev()}, function(){return cssnano()}],
		js: [function(){return rev()}, function(){return uglify()}]
	}))
	.pipe(gulp.dest('./docs'));
})

gulp.task('build', ['deleteProductionFolder','compressImages', 'usemin']);


/// Gulp default task
gulp.task('default', [ 'sass:watch']);