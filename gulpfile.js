var gulp          = require('gulp');
var browserSync   = require('browser-sync').create();
var sass          = require('gulp-sass');
var sourcemaps    = require('gulp-sourcemaps');
var beautify      = require('gulp-beautify');
var rename        = require('gulp-rename');
var autoprefixer  = require('gulp-autoprefixer');
var cssmin        = require('gulp-cssmin');
var shell         = require('gulp-shell');
var concat        = require('gulp-concat');


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


// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {
  browserSync.init({
    proxy: "starterkit.test",
    port: 8080,
    open: false
  });
  gulp.watch("resources/assets/css/**/*.scss", gulp.series('sass'));
}));

gulp.task('front', gulp.series('serve'));
