import axios, { AxiosResponse } from 'axios';
import { all, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';

import {
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  REMOVE_IMAGES_REQUEST,
  REMOVE_IMAGES_SUCCESS,
  REMOVE_IMAGES_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_TAGS_REQUEST,
  LOAD_TAGS_SUCCESS,
  LOAD_TAGS_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  UPDATE_COMMENT_REQUEST,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAILURE,
  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAILURE,
} from '../reducers/post';
import { REMOVE_POST_OF_ME } from '../reducers/user';
import { PostAction } from '../reducers/post';
import { PostType } from '../reducers/post';

function createPostAPI(data: any) {
  return axios.post('/post', data);
}

function* createPost(action: PostAction) {
  console.log(`createPost action.data: `, action.data);
  try {
    const result: AxiosResponse<PostType> = yield call(createPostAPI, action.data);
    console.log('createPost result : ', result);
    yield put({
      type: CREATE_POST_SUCCESS,
      data: result.data,
    });
    // yield put({
    // 	type: ADD_POST_TO_ME,
    // 	data: result.data.id,
    // });
  } catch (err) {
    console.error(err);
    yield put({
      type: CREATE_POST_FAILURE,
      error: err.response ? err.response.data : JSON.stringify(err),
    });
  }
}

function uploadImagesAPI(data: any) {
  return axios.post(`/post/images`, data);
}

function* uploadImages(action: PostAction) {
  console.log(action);
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response ? err.response.data : JSON.stringify(err),
    });
  }
}

function removeImagesAPI(data: any) {
  return axios.delete(`/post/images?imgPath=${data.imgPath}`);
}

function* removeImages(action: any) {
  console.log(action);
  try {
    const result = yield call(removeImagesAPI, action.data);
    yield put({
      type: REMOVE_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_IMAGES_FAILURE,
      error: err.response ? err.response.data : JSON.stringify(err),
    });
  }
}

function loadPostsAPI(data: any) {
  const isSearch = data ? !!data.searchQuery : null;
  return isSearch
    ? axios.get(
        `/posts/search?lastId=${(data && data.lastId) || 0}&searchQuery=${(data && data.searchQuery) || 0}&orderBy=${
          (data && data.orderBy) || 0
        }&popular=${(data && data.popular) || 0}`,
      )
    : axios.get(
        `/posts?lastId=${(data && data.lastId) || 0}&searchQuery=${(data && data.searchQuery) || 0}&orderBy=${
          (data && data.orderBy) || 0
        }&popular=${(data && data.popular) || 0}`,
      );
}
function* loadPosts(action: PostAction) {
  console.log('loadPosts : ', action);
  try {
    const result: AxiosResponse<PostType[]> = yield call(loadPostsAPI, action.data);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response ? err.response.data : JSON.stringify(err),
    });
  }
}

function loadTagsAPI(data: any) {
  const isSearch = data ? !!data.searchQuery : null;
  return isSearch
    ? axios.get(
        `/tags/search?lastId=${(data && data.lastId) || 0}&searchQuery=${(data && data.searchQuery) || 0}&orderBy=${
          (data && data.orderBy) || 0
        }&popular=${(data && data.popular) || 0}`,
      )
    : axios.get(
        `/tags?lastId=${(data && data.lastId) || 0}&searchQuery=${(data && data.searchQuery) || 0}&orderBy=${
          (data && data.orderBy) || 0
        }&popular=${(data && data.popular) || 0}`,
      );
}

function* loadTags(action: PostAction) {
  try {
    const result: AxiosResponse<PostType[]> = yield call(loadTagsAPI, action.data);
    yield put({
      type: LOAD_TAGS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_TAGS_FAILURE,
      error: err.response ? err.response.data : JSON.stringify(err),
    });
  }
}

function loadPostAPI(data: any) {
  return axios.get(`/post/${data}`);
}

function* loadPost(action: PostAction) {
  console.log(action.data);
  try {
    const result: AxiosResponse<PostType> = yield call(loadPostAPI, action.data);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POST_FAILURE,
      error: err.response ? err.response.data : JSON.stringify(err),
    });
  }
}

function updatePostAPI(data: any) {
  return axios.patch(`/post/${data.PostId}`, data);
}

function* updatePost(action: PostAction) {
  try {
    const result: AxiosResponse<PostType> = yield call(updatePostAPI, action.data);
    yield put({
      type: UPDATE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_POST_FAILURE,
      error: err.response ? err.response.data : JSON.stringify(err),
    });
  }
}

function removePostAPI(data: any) {
  return axios.delete(`/post/${data}`);
}

function* removePost(action: PostAction) {
  try {
    const result: AxiosResponse<PostType> = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: err.response ? err.response.data : JSON.stringify(err),
    });
  }
}

function likePostAPI(data: any) {
  return axios.patch(`/post/${data}/like`);
}

function* likePost(action: PostAction) {
  try {
    const result: AxiosResponse<PostType> = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response ? err.response.data : JSON.stringify(err),
    });
  }
}

function unlikePostAPI(data: any) {
  return axios.delete(`/post/${data}/like`);
}

function* unlikePost(action: PostAction) {
  try {
    const result: AxiosResponse<PostType> = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: err.response ? err.response.data : JSON.stringify(err),
    });
  }
}

function addCommentAPI(data: any) {
  return axios.post(`/post/${data.postId}/comment`, data); // POST /post/1/comment
}

function* addComment(action: PostAction) {
  try {
    const result: AxiosResponse<PostType> = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response ? err.response.data : JSON.stringify(err),
    });
  }
}

function updateCommentAPI(data: any) {
  return axios.patch(`/post/${data.postId}/comment/${data.commentId}`, data); // POST /post/1/comment/:commentId
}

function* updateComment(action: PostAction) {
  try {
    const result: AxiosResponse<PostType> = yield call(updateCommentAPI, action.data);
    yield put({
      type: UPDATE_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_COMMENT_FAILURE,
      error: err.response ? err.response.data : JSON.stringify(err),
    });
  }
}

function removeCommentAPI(data: any) {
  return axios.delete(`/post/${data.postId}/comment/${data.commentId}`, data); // POST /post/1/comment/:commentId
}

function* removeComment(action: PostAction) {
  try {
    const result: AxiosResponse<PostType> = yield call(removeCommentAPI, action.data);
    yield put({
      type: REMOVE_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_COMMENT_FAILURE,
      error: err.response ? err.response.data : JSON.stringify(err),
    });
  }
}

function* watchCreatePost() {
  yield takeLatest(CREATE_POST_REQUEST, createPost);
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchRemoveImages() {
  yield takeLatest(REMOVE_IMAGES_REQUEST, removeImages);
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchLoadTags() {
  yield throttle(5000, LOAD_TAGS_REQUEST, loadTags);
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchUpdatePost() {
  yield takeLatest(UPDATE_POST_REQUEST, updatePost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchUpdateComment() {
  yield takeLatest(UPDATE_COMMENT_REQUEST, updateComment);
}

function* watchRemoveComment() {
  yield takeLatest(REMOVE_COMMENT_REQUEST, removeComment);
}

export default function* postSaga() {
  yield all([
    fork(watchUploadImages),
    fork(watchRemoveImages),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchCreatePost),
    fork(watchLoadPost),
    fork(watchLoadPosts),
    fork(watchLoadTags),
    fork(watchUpdatePost),
    fork(watchRemovePost),
    fork(watchAddComment),
    fork(watchUpdateComment),
    fork(watchRemoveComment),
  ]);
}
