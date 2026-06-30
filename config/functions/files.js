import gulp from "gulp";
import changed from "gulp-changed";
import cleanPath from "./cleanPath.js";

export default async function files() {
  await cleanPath(["./dist/files"]);
  return gulp
    .src("./src/files/**/*", { nodir: true, encoding: false })
    .pipe(changed("./dist/files/"))
    .pipe(gulp.dest("./dist/files/"));
}
