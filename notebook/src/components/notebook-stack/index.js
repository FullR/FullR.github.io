import React from "react";
import caller from "util/caller";
import Stack from "../stack";
import StackHeader from "../stack-header";
import StackContent from "../stack-content";
import StackFooter from "../stack-footer";
import NotebookListHeader from "../notebook-list-header";
import NotebookListItem from "../notebook-list-item";
import PlusButton from "../plus-button";
import store from "store";
require("./style.scss");

export default class NotebookStack extends React.Component {
  static propTypes = {
    notebooks: React.PropTypes.array.isRequired,
    posts: React.PropTypes.array.isRequired,
    selectedNotebookId: React.PropTypes.number,
    onNotebookClick: React.PropTypes.func
  };

  render() {
    const {notebooks, posts, selectedNotebookId, onNotebookClick} = this.props;

    return (
      <Stack className="Notebook-stack">
        <StackHeader></StackHeader>
        <StackContent>
          <NotebookListHeader>NOTEBOOKS</NotebookListHeader>
          {notebooks.map(({id, name}) =>
            <NotebookListItem
              key={id}
              selected={id === selectedNotebookId}
              onClick={caller(onNotebookClick, id)}
              count={store.postCount(id)}
            >
              {name}
            </NotebookListItem>
          )}
        </StackContent>
        <StackFooter className="Notebook-stack__footer">
          <PlusButton className="Notebook-stack__create-button"/>
        </StackFooter>
      </Stack>
    );
  }
}
