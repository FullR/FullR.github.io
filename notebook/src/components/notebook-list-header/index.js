import React from "react";
import cn from "util/cn";
require("./style.scss");

export default class NotebookListHeader extends React.Component {
  render() {
    return (
      <div {...this.props} className={cn("Notebook-list-header", this.props.className)}/>
    );
  }
}
