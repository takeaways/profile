import {all,call,put,takeLatest,delay,fork} from 'redux-saga/effects';
import axios from 'axios';
import {
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LOAD_COMMENTS_FAILURE,
  LOAD_COMMENTS_REQUEST,
  LOAD_COMMENTS_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_MAIN_POSTS_FAILURE,
  LOAD_MAIN_POSTS_REQUEST,
  LOAD_MAIN_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS, RETWEET_FAILURE, RETWEET_REQUEST, RETWEET_SUCCESS,
  UNLIKE_POST_FAILURE, UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
} from '../reducers/post';



function addPostAPI(postData){
  //request to server
  return axios.post('/post', {postData}, {
    withCredentials:true
  })
}
function* addPost(action){
  try {
    const result = yield call(addPostAPI, action.data)
    yield put({
      type:ADD_POST_SUCCESS,
      data:result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type:ADD_POST_FAILURE,
      error:e
    })
  }
}
function* watchAddPost(){
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function addCommentAPI(){
  //request to server
}
function* addComment(action){
  try {
    yield put({
      type:ADD_COMMENT_SUCCESS,
      data:{
        postId:action.data.postId
      },
    });
  } catch (e) {
    console.error(e);
    yield put({
      type:ADD_COMMENT_FAILURE,
      error:e
    })
  }
}
function* watchAddComment(){
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function loadMainPostsAPI(){
  return axios.get('/posts');
}
function* loadMainPosts(){
  try {
    const result = yield call(loadMainPostsAPI);
    yield put({
      type:LOAD_MAIN_POSTS_SUCCESS,
      data:result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type:LOAD_MAIN_POSTS_FAILURE,
      error:e
    })
  }
}
function* watchLoadMainPosts(){
  yield takeLatest(LOAD_MAIN_POSTS_REQUEST, loadMainPosts);
}

export default function* userSaga(){
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchLoadMainPosts)
  ])
}
