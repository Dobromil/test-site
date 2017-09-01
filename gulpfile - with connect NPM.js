var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');




//////
/*gulp.task('watch',function(){
	watch('./app/index.html', function(){
		gulp.start('html');
	});
	//watch('./app/assets/styles/**///*.css', function(){
	//	gulp.start('styles');
	//})
//}) 

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

gulp.task('sass', function () {
  return gulp.src('./app/assets/sass/**/*.scss')
  	.pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./app/assets/styles/'))
    .pipe(connect.reload());
});

gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./app/assets/sass/**/*.scss', ['sass']);
  gulp.watch(['./app/*.html'], ['html']);
});

gulp.task('default', [ 'connect','sass','html','sass:watch',]);