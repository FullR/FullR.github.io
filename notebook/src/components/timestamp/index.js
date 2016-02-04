import React from "react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default class Timestamp extends React.Component {
  render() {
    const {date} = this.props;
    return (
      <div {...this.props}>
        {MONTHS[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
      </div>
    );
  }
}
