import "babel-polyfill";
import React from "react";
require("./style/normalize.scss");

//require("./index.html"); // Forces webpack to include our html file

function fatalError(error) {
  console.error("Unhandled error: " + error);
}

window.onload = function onload() {
  try {
    require("./app");
  } catch(error) {
    fatalError(error);
  }
};
