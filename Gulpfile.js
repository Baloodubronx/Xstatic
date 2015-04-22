// npm install --save-dev gulp main-bower-files gulp-inject gulp-livereload gulp-watch gulp-nodemon streamqueue gulp-uglify gulp-concat gulp-ng-annotate gulp-rev gulp-rimraf run-sequence gulp-filter gulp-minify-css

var gulp = require('gulp'),
    bowerFiles = require('main-bower-files'),
    inject = require('gulp-inject'),
    livereload = require('gulp-livereload'),
    nodemon = require('gulp-nodemon'),
    streamqueue = require('streamqueue'),
    stylus = require('gulp-stylus'),
    jade = require('gulp-jade'),
    templateCache = require('gulp-angular-templatecache'),
    rupture = require('rupture'),
    gulpFilter = require('gulp-filter'),
    concat = require('gulp-concat');

var ngModule = 'xstaticApp';

function jsfiles() {
  return streamqueue({ objectMode: true },
    gulp
      .src(bowerFiles(), {read: false})
      .pipe(gulpFilter(['*.js'])),
    gulp
      .src('./client/app/app.js'),
    gulp
      .src('./client/app/templates.js'),
    gulp
      .src(['./client/+(components|services|partials|directives)/**/*.js'], {read: false}),
    gulp
      .src(['./client/app/*/**/*.js'], {read: false})
  );
}

function cssfiles() {
  return streamqueue({ objectMode: true },
    gulp
      .src(bowerFiles(), {read: false})
      .pipe(gulpFilter(['*.css'])),
    gulp
      .src(['./client/app.css'], {read:false})
  );
}

gulp.task('templates', function() {
  return gulp.src('./client/**/*.jade')
    .pipe(jade({pretty: true}))
    .pipe(templateCache({module:ngModule}))
    .pipe(gulp.dest('./client/app'))
    .pipe(livereload());
});

gulp.task('stylus', function(){
  return gulp.src('./client/styles/index.styl')
    .pipe(
      stylus(
        { use: rupture() }
      )
    )
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./client/app'))
    .pipe(livereload());
});

gulp.task('inject', ['stylus', 'templates'], function(){
  gulp.src('./client/index.html')
    .pipe(inject(jsfiles(), {relative:false}))
    .pipe(inject(cssfiles(), {relative:false}))
    .pipe(gulp.dest('./client/'));
});

gulp.task('reload', function(){
  gulp.src('./client/!(bower_components)/*.js').pipe(livereload());
});

gulp.task('watch', ['inject'], function() {
  // start the livereload server
  livereload.listen();

  gulp.watch('./client/**/*.styl', ['stylus']);
  gulp.watch('./client/**/*.jade', ['templates']);
  gulp.watch('./client/**/*.js', ['reload']);
});

gulp.task('default', ['watch'], function(){
  nodemon(
    { script: 'server/app.js',
    watch: ['server/**/*.js'],
      env: { 'PORT':3000 } })
    .on('restart', function () {
      setTimeout(
        function() {
          livereload.changed();
        },
        1000
      );
      console.log('Server restarted!');
    });
});
