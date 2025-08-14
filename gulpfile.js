const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));

// HTML
gulp.task('html', () => {
  return gulp.src(['src/pages/**/*.html'])
    .pipe(fileInclude({ prefix: '@@', basepath: '@file' }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

// Compile Sass
gulp.task('sass', () => {
  return gulp.src('src/assets/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(browserSync.stream());
});

// Copy JS, Images
gulp.task('assets', () => {
  return gulp.src('src/assets/js/**/*')
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(browserSync.stream());
});

// Serve
gulp.task('serve', () => {
  browserSync.init({ server: { baseDir: 'dist' }, port: 3000 });

  gulp.watch('src/pages/**/*.html', gulp.series('html'));
  gulp.watch('src/partials/**/*.html', gulp.series('html'));
  gulp.watch('src/assets/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('src/assets/js/**/*.js', gulp.series('assets'));
});

// Default
gulp.task('default', gulp.series('html', 'sass', 'assets', 'serve'));
