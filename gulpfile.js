const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();

// HTML include
gulp.task('html', () => {
  return gulp.src(['src/pages/**/*.html'])
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream()); // <-- Reload browser
});

// Copy assets (CSS, JS, images...)
gulp.task('assets', () => {
  return gulp.src('src/assets/**/*')
    .pipe(gulp.dest('dist/assets'))
    .pipe(browserSync.stream()); // <-- Reload browser
});

// Serve project with BrowserSync
gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
    port: 3000
  });

  gulp.watch('src/pages/**/*.html', gulp.series('html'));
  gulp.watch('src/partials/**/*.html', gulp.series('html'));
  gulp.watch('src/assets/**/*', gulp.series('assets'));
});

// Default task
gulp.task('default', gulp.series('html', 'assets', 'serve'));
