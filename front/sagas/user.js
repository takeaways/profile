import {all,fork, put,takeLatest,delay} from 'redux-saga/effects';
import {
  EDIT_NICKNAME_FAILURE, EDIT_NICKNAME_REQUEST,
  EDIT_NICKNAME_SUCCESS,
  FOLLOW_USER_FAILURE,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE, LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS, REMOVE_FOLLOWER_FAILURE, REMOVE_FOLLOWER_REQUEST, REMOVE_FOLLOWER_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  UNFOLLOW_USER_FAILURE,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
} from '../reducers/user';

function loginAPI(){
  //request to server
}
function* login(data){
  try {
    yield delay(2000);
    yield put({
      type:LOG_IN_SUCCESS
    });
  } catch (e) {
    console.error(e);
    yield put({
      type:LOG_IN_FAILURE,
      error:e
    })
  }
}
function* watchLogin(){
  yield takeLatest(LOG_IN_REQUEST, login);
}

function signUpAPI(){
  //request to server
}
function* signUp(data){
  try {
    yield delay(2000);
    yield put({
      type:SIGN_UP_SUCCESS
    });
  } catch (e) {
    console.error(e);
    yield put({
      type:SIGN_UP_FAILURE,
      error:e
    })
  }
}
function* watchSignUp(){
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function logOutAPI(){
  //request to server
}
function* logOut(data){
  try {
    yield put({
      type:LOG_OUT_SUCCESS
    });
  } catch (e) {
    console.error(e);
    yield put({
      type:LOG_OUT_FAILURE,
      error:e
    })
  }
}
function* watchLogOut(){
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}



export default function* userSaga(){
  yield all([
    fork(watchLogin),
    fork(watchSignUp),
    fork(watchLogOut),
  ])
}
