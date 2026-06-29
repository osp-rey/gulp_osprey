import gulp from "gulp";
import browserSync from "browser-sync";

export default function server() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
    open: true,
    port: 3000,
    notify: false
  });
}