import gulp from "gulp";
import changed from "gulp-changed";
import imagemin from "gulp-imagemin";

export function imagesDev() {
  return gulp
    .src("./src/img/**/*", { encoding: false })
    .pipe(changed("./dist/img/"))
    .pipe(gulp.dest("./dist/img/"));
}

export function imagesBuild() {
  return gulp
    .src("./src/img/**/*", { encoding: false })
    .pipe(changed("./dist/img/"))
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest("./dist/img/"));
}
