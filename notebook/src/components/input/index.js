import React from "react";
import Icon from "../icon";
import cn from "util/cn";
require("./style.scss");

export default class Input extends React.Component {
  focus() {
    this.refs.input.focus();
  }

  render() {
    const {onChange, onBlur, value, placeholder, iconType} = this.props;
    const className = cn("Input", iconType ? "Input--with-icon" : null, this.props.className);
    return (
      <div {...this.props} onChange={null} value={null} className={className}>
        {iconType ?
          <Icon type={iconType} className="Input__icon" onClick={::this.focus}/> :
          null
        }
        <input ref="input" className="Input__input" onChange={onChange} value={value} placeholder={placeholder} onBlur={onBlur}/>
      </div>
    );
  }
}
