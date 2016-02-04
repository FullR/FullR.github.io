import React from "react";
import Stack from "../stack";
import StackHeader from "../stack-header";
import StackContent from "../stack-content";
import StackFooter from "../stack-footer";
import PlusButton from "../plus-button";
import PostListItem from "../post-list-item";
import Input from "../input";
import Icon from "../icon";
import caller from "util/caller";
require("./style.scss");

export default class PostStack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {filterText: ""};
  }

  updateFilterText(event) {
    this.setState({filterText: event.target.value});
  }

  getFilteredPosts() {
    const {posts} = this.props;
    const {filterText} = this.state;
    const regexp = new RegExp(filterText, "i");

    if(filterText.length) {
      return posts.filter(({title, text}) => regexp.test(title) || regexp.test(text));
    } else {
      return posts;
    }
  }

  render() {
    const {filterText, editingTitle} = this.state;
    const {selectedPostId, onClickPost, onRemovePost, notebookName, onTitleChange, onCreatePost} = this.props;
    const filteredPosts = this.getFilteredPosts();

    return (
      <Stack className="Post-stack">
        <StackHeader className="Post-stack__header">
          <PlusButton className="Post-stack__create-post-button" onClick={onCreatePost}/>
          <span>
            {notebookName}
          </span>
        </StackHeader>
        <StackContent>
          {filteredPosts.map((post) =>
            <PostListItem key={post.id}
              onClick={caller(onClickPost, post.id)}
              onRemoveClick={caller(onRemovePost, post.id)}
              selected={selectedPostId === post.id}
            >
              {post.title}
            </PostListItem>
          )}
        </StackContent>
        <StackFooter className="Post-stack__footer">
          <Input className="Post-stack__filter-input" placeholder="Filter by keyword or title" value={filterText} onChange={::this.updateFilterText} iconType="search"/>
        </StackFooter>
      </Stack>
    );
  }
}
