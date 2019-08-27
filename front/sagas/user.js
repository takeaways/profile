import {all,call,fork, put,takeLatest,delay} from 'redux-saga/effects';
import axios from 'axios';
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
  LOAD_USER_FAILURE_ME,
  LOAD_USER_REQUEST_ME,
  LOAD_USER_SUCCESS_ME,
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



function loginAPI(loginData){
  //request to server
  return axios.post('/user/login', loginData, {
    withCredentials:true,
  })
}
function* login(action){
  try {
    const result = yield call(loginAPI, action.data)
    yield put({
      type:LOG_IN_SUCCESS,
      data:result.data
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

function signUpAPI(signUpData){
  return axios.post('/user/', signUpData);
}
function* signUp(action){
  try {
    yield call(signUpAPI, action.data)
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
  return axios.post('/user/logout', {}, {
    withCredentials:true,
  });
}
function* logOut(data){
  try {
    yield call(logOutAPI);
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

//
function loadUserAPI(userId){
  //request to server 클라이언트에서 요청보낼 떄는 브라우저가 쿠키를 가이 동봉해줘요
  return axios.get(`/user/${userId}`, {
    withCredentials:true,
  }); // 서버사이드렌더링일 때는, 브라우저거 없어요
}
function* loadUser(action){
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type:LOAD_USER_SUCCESS,
      data:result.data,
      me:!action.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type:LOAD_USER_FAILURE,
      error:e
    })
  }
}
function* watchLoadUser(){
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}
//
function loadUserMeAPI(){
  //request to server 클라이언트에서 요청보낼 떄는 브라우저가 쿠키를 가이 동봉해줘요
  return axios.get(`/user/`, {
    withCredentials:true,
  }); // 서버사이드렌더링일 때는, 브라우저거 없어요
}
function* loadUserMe(action){
  try {
    const result = yield call(loadUserMeAPI);
    yield put({
      type:LOAD_USER_SUCCESS_ME,
      data:result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type:LOAD_USER_FAILURE_ME,
      error:e
    })
  }
}
function* watchLoadUserMe(){
  yield takeLatest(LOAD_USER_REQUEST_ME, loadUserMe);
}
//followAPI
function followAPI(userId){
  return axios.post(`/user/${userId || 0}/follow`,{}, {
    withCredentials:true,
  });
}
function* follow(action){
  try {
    const result = yield call(followAPI, action.data);
    yield put({
      type:FOLLOW_USER_SUCCESS,
      data:result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type:FOLLOW_USER_FAILURE,
      error:e
    })
  }
}
function* watchFollow(){
  yield takeLatest(FOLLOW_USER_REQUEST, follow);
}
//unFollowAPI
function unFollowAPI(userId){
  return axios.delete(`/user/${userId}/follow`,{
    withCredentials:true,
  });
}
function* unFollow(action){
  try {
    const result = yield call(unFollowAPI, action.data);
    yield put({
      type:UNFOLLOW_USER_SUCCESS,
      data:result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type:UNFOLLOW_USER_FAILURE,
      error:e
    })
  }
}
function* watchUnFollow(){
  yield takeLatest(UNFOLLOW_USER_REQUEST, unFollow);
}
//loadFollowingsAPI
function loadFollowingsAPI(userId, offset=0, limit=3){
  return axios.get(`/user/${userId || 0}/followings?offset=${offset}&limit=${limit}`,{
    withCredentials:true,
  });
}
function* loadFollowings(action){
  try {
    const result = yield call(loadFollowingsAPI, action.data.userId, action.data.offset);
    yield put({
      type:LOAD_FOLLOWINGS_SUCCESS,
      data:result.data,
      offset:action.data.offset
    });
  } catch (e) {
    console.error(e);
    yield put({
      type:LOAD_FOLLOWINGS_FAILURE,
      error:e
    })
  }
}
function* watchLoadFollowings(){
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}
//loadFollowersAPI
function loadFollowersAPI(userId, offset=0, limit=3){
  return axios.get(`/user/${userId || 0}/followers?offset=${offset}&limit=${limit}`,{
    withCredentials:true,
  });
}
function* loadFollowers(action){
  try {
    const result = yield call(loadFollowersAPI, action.data.userId, action.data.offset);
    yield put({
      type:LOAD_FOLLOWERS_SUCCESS,
      data:result.data,
      offset:action.data.offset
    });
  } catch (e) {
    console.error(e);
    yield put({
      type:LOAD_FOLLOWERS_FAILURE,
      error:e
    })
  }
}
function* watchLoadFollowers(){
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}
//RemoveFollowerAPI
function removeFollowerAPI(userId){
  return axios.delete(`/user/${userId}/follower`,{
    withCredentials:true,
  });
}
function* removeFollower(action){
  try {
    const result = yield call(removeFollowerAPI, action.data);
    yield put({
      type:REMOVE_FOLLOWER_SUCCESS,
      data:result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type:REMOVE_FOLLOWER_FAILURE,
      error:e
    })
  }
}
function* watchRemoveFollower(){
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}
//
function editNicknameAPI(nickname){
  return axios.patch(`/user/nickname`,{nickname}, {
    withCredentials:true,
  });
}
function* editNickname(action){
  try {
    const result = yield call(editNicknameAPI, action.data);
    yield put({
      type:EDIT_NICKNAME_SUCCESS,
      data:result.data
    });
  } catch (e) {
    console.error(e);
    yield put({
      type:EDIT_NICKNAME_FAILURE,
      error:e
    })
  }
}
function* watchEditNickname(){
  yield takeLatest(EDIT_NICKNAME_REQUEST, editNickname);
}



export default function* userSaga(){
  yield all([
    fork(watchLogin),
    fork(watchSignUp),
    fork(watchLogOut),
    fork(watchLoadUser),
    fork(watchLoadUserMe),
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchLoadFollowings),
    fork(watchLoadFollowers),
    fork(watchRemoveFollower),
    fork(watchEditNickname)
  ])
}
