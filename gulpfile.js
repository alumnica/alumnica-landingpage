var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var pkg = require("./package.json");
var sass = require("gulp-sass");

sass.compiler = require("node-sass");

// Copy third party libraries from /node_modules into /assets
gulp.task("assets", function() {
  // Bootstrap
  gulp
    .src([
      "./node_modules/bootstrap/dist/**/*",
      "!./node_modules/bootstrap/dist/css/bootstrap-grid*",
      "!./node_modules/bootstrap/dist/css/bootstrap-reboot*"
    ])
    .pipe(gulp.dest("./assets/bootstrap"));

  // jQuery
  gulp
    .src([
      "./node_modules/jquery/dist/*",
      "!./node_modules/jquery/dist/core.js"
    ])
    .pipe(gulp.dest("./assets/jquery"));

  // jQuery Easing
  gulp
    .src(["node_modules/jquery.easing/*.js"])
    .pipe(gulp.dest("assets/jquery-easing"));
});

//sass to css
gulp.task("sass", function() {
  return gulp
    .src("./css/*.scss")
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(gulp.dest("./css"));
});

// Default task
gulp.task("default", ["assets"]);

// Configure the browserSync task
gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch("./css/*.scss", ["sass"]);
  gulp.watch("./css/*.css").on("change", browserSync.reload);
  gulp.watch("./css/*.scss").on("change", browserSync.reload);
  gulp.watch("./js/*.js").on("change", browserSync.reload);
  gulp.watch("./*.html").on("change", browserSync.reload);
});

// Dev task
gulp.task("dev", ["browserSync"]);
