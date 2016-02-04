const path = require("path");
const webpack = require("webpack");
const local = (p) => path.join(__dirname, p);

module.exports = {
  devtool: "source-map",
  entry: [
    "./src/index"
  ],
  output: {
    path: local("dist"),
    filename: "bundle.js",
    publicPath: "/static/"
  },
  resolve: {
    root: local("src")
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {test: /\.js$/, loader: "babel", exclude: /node_modules/, include: local("src")},
      {test: /\.scss$/, loader: "style!css!autoprefixer!sass"},
      {test: /\.css$/, loader: "style!css!autoprefixer"},
      {test: /\.(eot|svg|ttf|woff|woff2)/, loader: "file"},
      {test: /\.json$/, loader: "json"}
    ]
  }
};
