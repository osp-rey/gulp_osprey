import gulp from "gulp";
import fileInclude from "gulp-file-include";
import gulpSass from "gulp-sass";
import * as dartSass from "sass";
import browserSync from "browser-sync";
import groupMediaQueries from "gulp-group-css-media-queries";
import plumber from "gulp-plumber";
import webpackStream from "webpack-stream";
import webpackConfig from "./webpack.config.js";
import imagemin from "gulp-imagemin";
import changed from "gulp-changed";
import { plumberSass, plumberHtml, plumberJs } from "./plumber.js";
import cleanPath from "./cleanPath.js";
import getVersion from "./functions/getVersion.js";

const sass = gulpSass(dartSass);

gulp.task("clean", async function () {
  await cleanPath(["./dist"]);
});

gulp.task("html:dev", function () {
  const versions = getVersion();

  return gulp
    .src("./src/*.html")
    .pipe(changed("./dist/"))
    .pipe(plumber(plumberHtml))
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
      }),
    )
    .pipe(gulp.dest("./dist/"));
});
gulp.task("html:build", function () {
  const versions = getVersion();

  return gulp
    .src("./src/*.html")
    .pipe(changed("./dist/"))
    .pipe(plumber(plumberHtml))
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
        context: { versions }
      }),
    )
    .pipe(gulp.dest("./dist/"));
});

gulp.task("sass", function () {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(changed("./dist/scss/"))
    .pipe(changed("./dist/css/"))
    .pipe(plumber(plumberSass))
    .pipe(sass())
    .pipe(groupMediaQueries())
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("images:dev", function () {
  return gulp
    .src("./src/img/**/*", { encoding: false })
    .pipe(changed("./dist/img/"))
    .pipe(gulp.dest("./dist/img/"));
});
gulp.task("images:build", function () {
  return gulp
    .src("./src/img/**/*", { encoding: false })
    .pipe(changed("./dist/img/"))
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest("./dist/img/"));
});

gulp.task("files", async function () {
  await cleanPath(["./dist/files"]);
  return gulp
    .src("./src/files/**/*", { nodir: true })
    .pipe(changed("./dist/files/"))
    .pipe(gulp.dest("./dist/files/"));
});

gulp.task("js", function () {
  return gulp
    .src("./src/js/*.js")
    .pipe(changed("./dist/js/"))
    .pipe(plumber(plumberJs))
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest("./dist/js"));
});

gulp.task("reload", function (done) {
  browserSync.reload();
  done();
});

gulp.task("server", function () {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
    open: true,
    port: 3000,
  });
});

gulp.task("watch", function () {
  gulp.watch("./src/scss/**/*.scss", gulp.parallel("sass", "reload"));
  gulp.watch("./src/**/*.html", gulp.parallel("html", "reload"));
  gulp.watch("./src/js/**/*.js", gulp.parallel("js", "reload"));
  gulp.watch("./src/img/**/*", gulp.parallel("images:dev", "reload"));
  gulp.watch("./src/files/**/*", gulp.parallel("files", "reload"));
});
