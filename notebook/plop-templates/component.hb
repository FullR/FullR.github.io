import React from "react";
import cn from "util/cn";
require("./style.scss");

export default class {{pascalCase name}} extends React.Component {
  render() {
    const {className} = this.props;
    const classNames = cn("{{dashcapCase name}}", className);

    return (
      <div {...this.props} className={classNames}/>
    );
  }
}
