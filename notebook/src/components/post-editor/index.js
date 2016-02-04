import React from "react";
import cn from "util/cn";
require("./style.scss");

export default class PostEditor extends React.Component {
  componentDidMount() {
    const {titleInput} = this.refs;
    if(titleInput) {
      titleInput.focus();
    }
  }

  render() {
    const {text, title, onChange, onTitleChange} = this.props;
    return (
      <div {...this.props} className={cn("Post-editor", this.props.className)} onChange={null}>
        <input
          ref="titleInput"
          className="Post-editor__title-input"
          value={title}
          placeholder="Title"
          onChange={onTitleChange}
        />
        <textarea
          className="Post-editor__content-input"
          value={text}
          onChange={onChange}
        />
      </div>
    );
  }
}
