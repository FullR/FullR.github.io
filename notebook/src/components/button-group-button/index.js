import React from "react";
import cn from "util/cn";
require("./style.scss");

export default class ButtonGroupButton extends React.Component {
  render() {
    const {selected} = this.props;
    const className = cn(
      "Button-group-button",
      selected ? "Button-group-button--selected" : null,
      this.props.className
    );
    return (
      <div {...this.props} className={className}/>
    );
  }
}
