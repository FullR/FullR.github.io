import React from "react";
import Icon from "../icon";
import cn from "util/cn";
require("./style.scss");

export default class NotebookListItem extends React.Component {
  static propTypes = {
    count: React.PropTypes.number
  };

  static defaultProps = {
    count: 0
  };

  render() {
    const {selected, count, children} = this.props;
    const className = cn(
      "Notebook-list-item",
      selected ? "Notebook-list-item--selected" : null,
      this.props.className
    );
    return (
      <div {...this.props} className={className}>
        <div className="Notebook-list-item__name">
          <Icon type="book" className="Notebook-list-item__icon"/>{children}
        </div>
        <div className="Notebook-list-item__count">
          {count}
        </div>
      </div>
    );
  }
}
