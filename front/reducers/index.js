import { combineReducers } from 'redux';
import user from './user';
import post from './post'; //reducer

const rootReducer = combineReducers({
  user,
  post
})

export default rootReducer;
