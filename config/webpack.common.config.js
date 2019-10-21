const path = require("path");
const DIST_PATH = path.resolve(__dirname, "../dist");

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    index: "./src/index.js",
    framework: ["react", "react-dom"]
  },
  output: {
    filename: "js/bundle.js",
    path: DIST_PATH
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "images/",
            limit: 8192
          }
        }
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name]_[hash].[ext]",
            outputPath: "font/"
          }
        }
      }
    ]
  }
};
