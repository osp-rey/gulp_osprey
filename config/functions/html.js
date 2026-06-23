import gulp from "gulp";
import plumber from "gulp-plumber";
import replace from "gulp-replace";
import fileInclude from "gulp-file-include";
import getVersion from "./getVersion.js";
import {plumberHtml } from "./plumber.js";

export function htmlDev() {
  const versions = getVersion();

  return gulp
    .src("./src/*.html")
    .pipe(plumber(plumberHtml))
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
      }),
    )
    .pipe(replace(/@img\//g, "img/"))
    .pipe(gulp.dest("./dist/"));
}

export function htmlBuild() {
  const versions = getVersion();

  return gulp
    .src("./src/*.html")
    .pipe(plumber(plumberHtml))
    .pipe(
      fileInclude({
        prefix: "@@",
        basepath: "@file",
        context: { versions },
      }),
    )
    .pipe(replace(/@img\//g, "img/"))
    .pipe(gulp.dest("./dist/"));
}
