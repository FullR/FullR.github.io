import React from "react";
import cn from "util/cn";
require("./style.scss");

export default class ButtonGroup extends React.Component {
  render() {
    return (
      <div {...this.props} className={cn("Button-group", this.props.className)}/>
    );
  }
}
