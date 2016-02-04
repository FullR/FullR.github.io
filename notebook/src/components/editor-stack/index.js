import React from "react";
import Stack from "../stack";
import StackHeader from "../stack-header";
import StackContent from "../stack-content";
import StackFooter from "../stack-footer";
import PostEditor from "../post-editor";
import Markdown from "../markdown";
import Icon from "../icon";
import ButtonGroup from "../button-group";
import ButtonGroupButton from "../button-group-button";
require("./style.scss");

export default class EditorStack extends React.Component {
  static propTypes = {
    post: React.PropTypes.object
  };

  renderContent() {
    const {post, onChange, onTitleChange, editing} = this.props;

    if(editing) {
      return (
        <PostEditor
          className="Editor-stack__post-editor"
          text={post.text}
          title={post.title}
          onChange={onChange}
          onTitleChange={onTitleChange}
        />
      );
    } else {
      return [
        <h1 key="title">{post.title}</h1>,
        <Markdown className="Editor-stack__rendered-markdown" key="markdown" text={post.text}/>
      ];
    }
  }

  render() {
    const {post, onEnableEditing, onDisableEditing, editing} = this.props;

    return (
      <Stack className="Editor-stack">
        <StackHeader className="Editor-stack__header">
          <Icon type="bars" className="Editor-stack__hamburger"/>
          <ButtonGroup className="Editor-stack__header-button-group">
            <ButtonGroupButton className="Editor-stack__edit-button" selected={editing} onClick={onEnableEditing}>
              <Icon type="pencil"/>
            </ButtonGroupButton>
            <ButtonGroupButton className="Editor-stack__preview-button" selected={!editing} onClick={onDisableEditing}>
              <Icon type="eye"/>
            </ButtonGroupButton>
          </ButtonGroup>
          <Icon type="search"/>
        </StackHeader>
        <StackContent className="Editor-stack__content">
          {post ?
            this.renderContent() :
            null
          }
        </StackContent>
        <StackFooter className="Editor-stack__footer"></StackFooter>
      </Stack>
    );
  }
}
