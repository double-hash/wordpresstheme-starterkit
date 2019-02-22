var gulp          = require('gulp');
var babelify      = require('babelify');
var browserify    = require('browserify');
var browserSync   = require('browser-sync').create();
var sass          = require('gulp-sass');
var sourcemaps    = require('gulp-sourcemaps');
var beautify      = require('gulp-beautify');
var rename        = require('gulp-rename');
var autoprefixer  = require('gulp-autoprefixer');
var cssmin        = require('gulp-cssmin');
var shell         = require('gulp-shell');
var concat        = require('gulp-concat');
var uglify        = require('gulp-uglify');
var source        = require('vinyl-source-stream');
var buffer        = require('vinyl-buffer');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src("resources/assets/css/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({
      style: 'expanded',
      sourceComments: 'normal'
    }))
    // Ajoute des préfixes automatiquement
    .pipe(autoprefixer())
    // Commente le code pour debug
    .pipe(sourcemaps.write())
    // Sauve le fichier dans assets
    .pipe(gulp.dest("assets"))
    // browserSync
    .pipe(browserSync.stream())
    // Renomme le fichier avec .min
    .pipe(rename({suffix: '.min'}))
    // Compresse le fichier
    .pipe(cssmin())
    // Sauve le fichier dans assets
    .pipe(gulp.dest('assets'))
});

// process JS files and return the stream.
gulp.task('js', function () {
  return browserify({
    entries: './resources/assets/js/scripts.js',
    debug: true
  })
  .transform("babelify", { presets: ["@babel/preset-env"] })
  .bundle()
  .pipe(source('scripts.js'))
  .pipe(buffer())
  // Indente
  .pipe(beautify({indentSize: 2}))
  // Sauve le fichier dans public/assets
  .pipe(gulp.dest("assets"))
  // Renomme le fichier avec .min
  .pipe(rename({suffix: '.min'}))
  // Compresse le fichier
  .pipe(uglify())
  // Sauve le fichier compressé dans public/assets
  .pipe(gulp.dest('assets'))
});

// reloading browsers
gulp.task('js-watch', gulp.series('js', function (done) {
  browserSync.reload();
  done();
}));

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {
  browserSync.init({
    proxy: "starterkit.test",
    port: 8080,
    open: false
  });
  gulp.watch("resources/assets/css/**/*.scss", gulp.series('sass'));
  gulp.watch("resources/assets/js/**/*.js", gulp.series('js-watch'));
}));

gulp.task('build', gulp.series('serve'));
