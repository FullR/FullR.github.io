const path = require("path");
const webpack = require("webpack");
const local = (p) => path.join(__dirname, p);

module.exports = {
  devtool: "cheap-module-eval-source-map",
  entry: [
    "eventsource-polyfill", // necessary for hot reloading with IE
    "webpack-hot-middleware/client",
    "./src/index"
  ],
  resolve: {
    root: local("src")
  },
  output: {
    path: local("dist"),
    filename: "bundle.js",
    publicPath: "/"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {test: /\.jsx?$/, loader: "babel", include: local("src")},
      {test: /\.scss$/, loader: "style!css!autoprefixer!sass"},
      {test: /\.css$/, loader: "style!css!autoprefixer"},
      {test: /\.(eot|svg|ttf|woff|woff2)/, loader: "file"},
      {test: /\.json$/, loader: "json"}
    ]
  }
};
