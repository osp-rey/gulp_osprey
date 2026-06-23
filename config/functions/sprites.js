import gulp from "gulp";
import svgSprite from "gulp-svg-sprite";

export default function sprites() {
  return gulp
    .src("./src/svgicons/*.svg")
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: "../img/icons/icons.svg",
          },
        },
        shape: {
          id: {
            separator: "",
            generator: "",
          },
        },
        svg: {
          rootAttributes: {
            style: "display: none;",
            "aria-hidden": true,
          },
          xmlDeclaration: false,
        },
      }),
    )
    .pipe(gulp.dest("./dist"));
}
