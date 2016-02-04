import React from "react";
import cn from "util/cn";
require("./style.scss");

export default class StackHeader extends React.Component {
  render() {
    return (
      <div {...this.props} className={cn("Stack-header", this.props.className)}/>
    );
  }
}
