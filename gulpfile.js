var gulp = require ('gulp');
var concat = require ('gulp-concat');
var uglify = require ('gulp-sass');
var sass = require ('gulp-sass');
var minifyCSS = require ('gulp-minify-css');
var webserver = require('gulp-webserver');

gulp.task('script', function(){
	gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/materialize-css/dist/js/materialize.js', 'assets/js/*.js'])
	.pipe(concat('script.js'))
	.pipe(gulp.dest('dist/js/'));
});

gulp.task('style', function(){
	gulp.src(['node_modules/materialize-css/dist/css/materialize.css', 'assets/sass/main.scss'])
	.pipe(sass().on('error', sass.logError))
	.pipe(minifyCSS())
	.pipe(concat('style.min.css'))
	.pipe(gulp.dest('dist/css/'));
});

gulp.task('watch', function(){
	gulp.watch('assets/sass/main.scss', ['style']);
});

gulp.task('webserver', function(){
	gulp.src('../tastyFood/')
		.pipe(webserver({
			fallback: 'index.html',
			livereload: true,
			directoryListing: false,
			open:true,
			port: 8080
		}));
});

gulp.task('default', ['script', 'style', 'watch']);