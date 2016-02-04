import React from "react";
import Icon from "components/icon";
import cn from "util/cn";
require("./style.scss");

export default class XButton extends React.Component {
  render() {
    return (
      <div {...this.props} className={cn("X-button", this.props.className)}>
        <Icon type="times"/>
      </div>
    );
  }
}
