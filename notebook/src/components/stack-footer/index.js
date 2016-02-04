import React from "react";
import cn from "util/cn";
require("./style.scss");

export default class StackFooter extends React.Component {
  render() {
    return (
      <div {...this.props} className={cn("Stack-footer", this.props.className)}/>
    );
  }
}
