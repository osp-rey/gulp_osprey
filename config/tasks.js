import gulp from "gulp";
import cleanPath from "./functions/cleanPath.js";
import { htmlDev, htmlBuild } from "./functions/html.js";
import handlerSass from "./functions/sass.js";
import { imagesDev, imagesBuild } from "./functions/images.js";
import files from "./functions/files.js";
import { jsDev, jsBuild } from "./functions/js.js";
import sprites from "./functions/sprites.js";
import serverReload from "./functions/serverReload.js";
import server from "./functions/server.js";

gulp.task("clean", async function () {
  await cleanPath(["./dist"]);
});

gulp.task("html:dev", htmlDev);
gulp.task("html:build", htmlBuild);
gulp.task("sass", handlerSass);
gulp.task("images:dev", imagesDev);
gulp.task("images:build", imagesBuild);
gulp.task("files", files);
gulp.task("js:dev", jsDev);
gulp.task("js:build", jsBuild);
gulp.task("sprites", sprites);
gulp.task("reload", serverReload);
gulp.task("server", server);

gulp.task("watch", function () {
  gulp.watch("./src/scss/**/*.scss", gulp.parallel("sass", "reload"));
  gulp.watch("./src/**/*.html", gulp.parallel("html:dev", "reload"));
  gulp.watch("./src/js/**/*.js", gulp.parallel("js:dev", "reload"));
  gulp.watch("./src/img/**/*", gulp.parallel("images:dev", "reload"));
  gulp.watch("./src/files/**/*", gulp.parallel("files", "reload"));
  gulp.watch("./src/svgicons/*.svg", gulp.parallel("sprites", "reload"));
});
