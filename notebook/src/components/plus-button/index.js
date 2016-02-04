import React from "react";
import Icon from "components/icon";
import cn from "util/cn";
require("./style.scss");

export default class PlusButton extends React.Component {
  render() {
    return (
      <div {...this.props} className={cn("Plus-button", this.props.className)}>
        <Icon type="plus"/>
      </div>
    );
  }
}
