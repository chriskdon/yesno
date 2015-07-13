'use strict';

var gulp = require('gulp');
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var less = require('gulp-less');
var watchLess = require('gulp-watch-less');
var path = require('path');
var rename = require("gulp-rename");
var exec = require('child_process').exec;

var config = {
  less: {
    src: 'client_app/less/**/*.less',
    destDir: './public/css/',
    destFile: 'app.compiled.css'
  },
  browserify: {
    entries: ['./client_app/js/main.js'],
    destDir: './public/js/',
    destFile: 'app.compiled.js',
    debug: true
  }
};

var browserifyOpts = assign({}, watchify.args, config.browserify);
var watchifyClient = watchify(browserify(browserifyOpts));

// define tasks here
gulp.task('default', ['js', 'less', 'connect']);

gulp.task('watch', ['js:watch', 'less:watch']);

gulp.task('connect', function(cb) {
  var app = exec('npm start', function(err, stdout, stderr) {
    cb(err);
  });

  app.stdout.on('data', function(data) { console.log(data); });
  app.stderr.on('data', function(data) { console.error(data); });
});

gulp.task('less', bundleLess(false));
gulp.task('less:watch', ['less'], bundleLess(true));

gulp.task('js', bundleJs); // so you can run `gulp js` to build the file
gulp.task('js:watch', ['js'], function() {
  watchifyClient.on('update', bundleJs); // on any dep update, rebuild
  watchifyClient.on('log', gutil.log); // Output build log
});

function bundleLess(watch) {
  return function() {
    var pipeline = gulp.src(config.less.src);

    if(watch) { pipeline.pipe(watchLess(config.less.src)); }

    pipeline.pipe(less({
       paths: [ path.join(__dirname, 'less', 'includes') ]
     }))
     .pipe(rename(config.less.destFile))
     .pipe(gulp.dest(config.less.destDir));

     return pipeline;
  }
}

function bundleJs() {
  return watchifyClient.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error')) // log errors if they happen
    .pipe(source(config.browserify.destFile))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
     // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest(config.browserify.destDir));
}
