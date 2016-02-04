import React from "react";
import Timestamp from "../timestamp";
import XButton from "../x-button";
import Icon from "../icon";
import noBubble from "util/no-bubble";
import cn from "util/cn";
require("./style.scss");

export default class PostListItem extends React.Component {
  static propTypes = {
    selected: React.PropTypes.bool,
    date: React.PropTypes.instanceOf(Date)
  };

  static defaultProps = {
    selected: false,
    date: new Date()
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {selected, date, onRemoveClick, children} = this.props;
    const className = cn("Post-list-item", selected ? "Post-list-item--selected" : null, this.props.className);

    return (
      <div {...this.props} className={className}>
        {children}
        <div className="Post-list-item__date">
          <Timestamp date={date}/>
        </div>
        <XButton className="Post-list-item__remove-button" onClick={noBubble(onRemoveClick)}/>
      </div>
    );
  }
}
