const gulp = require('gulp');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const nodemon = require('gulp-nodemon');

/**
 * Gulp Tasks
 */

gulp.task('browser-sync', ['nodemon'], () => {
  browserSync({
    proxy: 'localhost:3000',  // local node app address
    port: 5000,  // use *different* port than above
    notify: true,
  });
});

gulp.task('nodemon', (cb) => {
  let called = false;
  return nodemon({
    script: './bin/www',
    ignore: [
      'gulpfile.js',
      'node_modules/',
    ],
  })
  .on('start', () => {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', () => {
    setTimeout(() => {
      reload({ stream: false });
    }, 1000);
  });
});

gulp.task('default', ['browser-sync'], () => {
  gulp.watch(['public/javascripts/*.js'], reload);
  gulp.watch(['public/stylesheets/*.css'], reload);
  gulp.watch(['views/*.pug'], reload);
  gulp.watch(['views/mixins/*.pug'], reload);
  gulp.watch(['*.js'], reload);
});
