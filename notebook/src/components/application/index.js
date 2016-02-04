import React from "react";
import remove from "util/remove";
import SplitPane from "react-split-pane";
import EditorStack from "../editor-stack";
import NotebookStack from "../notebook-stack";
import PostStack from "../post-stack";
import store from "store";
require("./style.scss");

export default class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNotebookId: 0,
      currentPostId: 0,
      editing: false
    };
  }

  updateCurrentPost(event) {
    store.postFromId(this.state.currentPostId).text = event.target.value;
    this.forceUpdate();
  }

  updateCurrentPostTitle(event) {
    store.postFromId(this.state.currentPostId).title = event.target.value;
    this.forceUpdate();
  }

  createPost() {
    const {currentNotebookId: notebookId} = this.state;
    const {id} = store.posts.length;
    const date = Date.now();

    store.posts.push({
      id,
      date,
      notebookId,
      title: "New Post",
      text: ""
    });

    this.setState({currentPostId: id, editing: true});
  }

  enableEditing() {
    this.setState({editing: true});
  }

  disableEditing() {
    this.setState({editing: false});
  }

  removePost(id) {
    remove(store.posts, (post) => post.id === id);
    this.forceUpdate();
  }

  selectNotebook(notebookId) {
    this.setState({currentNotebookId: notebookId});
  }

  selectPost(postId) {
    this.setState({currentPostId: postId});
  }

  render() {
    const {currentNotebookId, currentPostId, editing} = this.state;
    const notebook = store.notebookFromId(currentNotebookId);
    const post = store.postFromId(currentPostId);
    const posts = store.notebookPosts(currentNotebookId);

    return (
      <div className="Application">
        <SplitPane split="vertical" defaultSize="250" minSize="200">
          <NotebookStack
            notebooks={store.notebooks}
            posts={posts}
            selectedNotebookId={currentNotebookId}
            onNotebookClick={::this.selectNotebook}
          />
          <SplitPane split="vertical" defaultSize="400" minSize="200">
            <PostStack
              selectedPostId={currentPostId}
              posts={posts}
              notebookName={notebook.name}
              onClickPost={::this.selectPost}
              onRemovePost={::this.removePost}
              onCreatePost={::this.createPost}
            />
            <EditorStack
              editing={editing}
              post={post}
              onChange={::this.updateCurrentPost}
              onTitleChange={::this.updateCurrentPostTitle}
              onEnableEditing={::this.enableEditing}
              onDisableEditing={::this.disableEditing}
            />
          </SplitPane>
        </SplitPane>
      </div>
    );
  }
}
