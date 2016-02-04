const path = require("path");
const express = require("express");
const webpack = require("webpack");
const config = require("./webpack.config.dev");
const app = express();
const compiler = webpack(config);
const port = 8080;

app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "index.html"));
});

app.listen(port, "localhost", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Listening at http://localhost:${port}`);
  }
});
