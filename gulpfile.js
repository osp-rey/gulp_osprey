import gulp from "gulp";
import "./config/tasks.js"

gulp.task(
  "default",
  gulp.series(
    "clean",
    gulp.parallel("html:dev", "sass", "js", "images:dev", "files"),
    gulp.parallel("server", "watch"),
  ),
);

gulp.task(
  "build",
  gulp.series(
    "clean",
    gulp.parallel("html:build", "sass", "js", "images:build", "files"),
  ),
);