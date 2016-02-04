import React from "react";
import cn from "util/cn";
require("./style.scss");

export default class StackContent extends React.Component {
  render() {
    return (
      <div {...this.props} className={cn("Stack-content", this.props.className)}/>
    );
  }
}
