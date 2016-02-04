import React from "react";
import cn from "util/cn";
require("./style.scss");

export default class Stack extends React.Component {
  render() {
    return (
      <div {...this.props} className={cn("Stack", this.props.className)}/>
    );
  }
}
