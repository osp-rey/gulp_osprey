import notify from "gulp-notify";

const plumberSass = {
  errorHandler: notify.onError({
    title: "Styles",
    message: "Error <%= error.message %>",
    sound: false,
  }),
};
const plumberHtml = {
  errorHandler: notify.onError({
    title: "HTML",
    message: "Error <%= error.message %>",
    sound: false,
  }),
};
const plumberJs = {
  errorHandler: notify.onError({
    title: "JavaScript",
    message: "Error <%= error.message %>",
    sound: false,
  }),
};

export { plumberSass, plumberHtml, plumberJs };
