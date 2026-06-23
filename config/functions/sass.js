import gulp from "gulp";
import plumber from "gulp-plumber";
import replace from "gulp-replace";
import changed from "gulp-changed";
import { plumberSass } from "./plumber.js";
import gulpSass from "gulp-sass";
import * as dartSass from "sass";
import groupMediaQueries from "gulp-group-css-media-queries";

const sass = gulpSass(dartSass);

export default function handlerSass() {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(changed("./dist/scss/"))
    .pipe(changed("./dist/css/"))
    .pipe(plumber(plumberSass))
    .pipe(sass())
    .pipe(groupMediaQueries())
    .pipe(replace(/@img\//g, "../img/"))
    .pipe(gulp.dest("./dist/css"));
}