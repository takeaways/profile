import React from 'react';
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import withRedux from 'next-redux-wrapper'
import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import AppLayout from '../components/AppLayout';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const Main = ({Component, store}) => {
  return(
    <Provider store={store}>
      <AppLayout>
        <Component/>
      </AppLayout>
    </Provider>
  )
}

Main.propTypes = {
  Component:PropTypes.elementType.isRequired,
  store:PropTypes.object.isRequired
}

const configStore = (initialState, options)=>{

  const sagaMiddleware = createSagaMiddleware(); //사가 연결 --------------
  //devtool 연결 나중에 여긴 필요없을 듯
  //리덕스 성크, 사가,
  const middlewares = [sagaMiddleware];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : compose(
    applyMiddleware(...middlewares),
    !options.isServer&& window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
    window.__REDUX_DEVTOOLS_EXTENSION__() :
    (f) => f)
  //
  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);//사가연결 -------------------------------
  return store
}
export default withRedux(configStore)(Main);
//고차 컴포넌트 기존 컴포넌트의 기능을 확정할 때 사용합니다.
