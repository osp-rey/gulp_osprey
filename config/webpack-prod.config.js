import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import TerserPlugin from "terser-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcPath = path.resolve("src");
const htmlFiles = fs
  .readdirSync(srcPath)
  .filter((file) => file.endsWith(".html"));

const entry = {};

htmlFiles.forEach((file) => {
  const name = path.basename(file, ".html");
  entry[name] = "./src/js/app.js";
});

const webpackConfig = {
  mode: "production",
  entry,
  output: {
    filename: "app.js",
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: false,
          mangle: false,
          format: {
            comments: false,
            beautify: true, 
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};

export default webpackConfig;
