 var gulp 		  = require('gulp'),
 	 sass  		  = require('gulp-sass'),
 	 browserSync  = require('browser-sync'),
 	 concat 	  = require('gulp-concat'),
 	 uglify 	  = require('gulp-uglifyjs');
 	 cssnano 	  = require('gulp-cssnano'),
 	 rename 	  = require('gulp-rename'),
 	 autoprefixer = require('gulp-autoprefixer'),
 	 imagemin 	  = require('gulp-imagemin'),
 	 pngquant 	  = require('imagemin-pngquant'),
 	 cache 		  = require('gulp-cache'),
 	 del 		  = require('del');

gulp.task('scss', function(){
	return gulp.src('src/scss/**/*.scss')
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions', '>1%', 'ie 8', 'ie 7'], {cascade : true}))
	.pipe(gulp.dest('src/css'));
});

gulp.task('css', ['scss'], function(){
	return gulp.src('src/css/style.css')
	.pipe(cssnano())
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.reload({stream : true}));
});

gulp.task('scripts', function(){
	gulp.src([
		'src/libs/jquery/dist/jquery.min.js'
	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('src/js'))
});

gulp.task('clean', function(){
	return del.sync('dist');
});

gulp.task('clear', function(){
	return cache.clearAll();
});

gulp.task('img', function(){
	return gulp.src('src/img/**/*')
	.pipe(cache(imagemin({
		interlaced 	: true,
		progressive : true,
		svgoPlugins : [{removeViewBox : false}],
		use 		: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img'));
});


gulp.task('browserSync', function(){
	browserSync.init({
        server: {
            baseDir: 'src'
        },
        notify: false
    });
});

gulp.task('watch', ['browserSync', 'css', 'scripts'], function(){
	gulp.watch('src/scss/*.scss', ['css']);
	gulp.watch('src/*.html', browserSync.reload);
	gulp.watch('src/js/**/*.js', browserSync.reload);
});	

gulp.task('build', ['clean', 'css', 'scripts', 'img'],  function(){
	var buildCss 	= gulp.src(['src/css/style.min.css']).pipe(gulp.dest('dist/css'));
	var buildFonts 	= gulp.src(['src/fonts/**/*']).pipe(gulp.dest('dist/fonts'));
	var buildJS 	= gulp.src(['src/js/**/*']).pipe(gulp.dest('dist/js'));
	var buildHtml 	= gulp.src(['src/*.html']).pipe(gulp.dest('dist'));
});