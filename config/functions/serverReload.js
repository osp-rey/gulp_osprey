import browserSync from "browser-sync";

export default function serverReload(done) {
  browserSync.reload();
  done();
}