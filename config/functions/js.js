import gulp from "gulp";
import plumber from "gulp-plumber";
import changed from "gulp-changed";
import webpackStream from "webpack-stream";
import webpackConfigDev from "../webpack-dev.config.js";
import webpackConfigProd from "../webpack-prod.config.js";
import { plumberJs } from "./plumber.js";

export function jsDev() {
  return gulp
    .src("./src/js/*.js")
    .pipe(changed("./dist/js/"))
    .pipe(plumber(plumberJs))
    .pipe(webpackStream(webpackConfigDev))
    .pipe(gulp.dest("./dist/js"));
}
export function jsBuild () {
  return gulp
    .src("./src/js/*.js")
    .pipe(webpackStream(webpackConfigProd))
    .pipe(gulp.dest("./dist/js"));
}