import React from "react";
import cn from "util/cn";
require("style/font-awesome-4.5.0/css/font-awesome.css");

export default class Icon extends React.Component {
  render() {
    const {type} = this.props;
    const className = cn("fa", `fa-${type}`, this.props.className);
    return (
      <i {...this.props} className={className}/>
    );
  }
}
