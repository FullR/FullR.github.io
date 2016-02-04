import {posts, notebooks} from "test-data";

export function notebookFromId(id) {
  return notebooks.find((notebook) => notebook.id === id);
}

export function postFromId(id) {
  return posts.find((post) => post.id === id);
}

export function notebookPosts(notebookId) {
  return posts.filter((post) => post.notebookId === notebookId) || [];
}

export function postCount(notebookId) {
  return notebookPosts(notebookId).length;
}

export default {
  posts, notebooks,
  notebookFromId,
  postFromId,
  notebookPosts,
  postCount
};
