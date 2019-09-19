import React from 'react';
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import withRedux from 'next-redux-wrapper'
import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import axios from 'axios';
import App from 'next/app';
//ssr
import withReduxSaga from 'next-redux-saga'
import Helmet from 'react-helmet';
import AppLayout from '../components/AppLayout';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
import {LOAD_USER_REQUEST_ME} from '../reducers/user'


const Main = ({Component, store, pageProps}) => {
  return(
    <Provider store={store}>
      <Helmet
        title='PROFILE'
        htmlAttributes={{lang:'ko'}}
        meta={[{
            charset: 'UTF-8',
          }, {
            name: 'viewport',
            content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover',
          }, {
            'http-equiv': 'X-UA-Compatible', content: 'IE=edge',
          }, {
            name: 'description', content: 'Geonil Profile',
          }, {
            name: 'og:title', content: 'Geonil Profile',
          }, {
            name: 'og:description', content: 'Geonil Profile',
          }, {
            property: 'og:type', content: 'website',
          }]}
      />
      <AppLayout>
        <Component {...pageProps}/>
      </AppLayout>
    </Provider>
  )
}

Main.propTypes = {
  Component:PropTypes.elementType.isRequired,
  store:PropTypes.object.isRequired
}

//next랑 연결후 파라미터 전달을 위해서
Main.getInitialProps = async (context) =>{
  const {ctx, Component} = context;
  let pageProps = {};
  //브라우져가 없기 때문에 쿠키를 넘겨주자
  const state = ctx.store.getState();
  const cookie = ctx.isServer ? ctx.req.headers.cookie : '';
  if(ctx.isServer && cookie){
    axios.defaults.headers.Cookie = cookie;
  }
  if(!state.user.me){
    ctx.store.dispatch({
      type:LOAD_USER_REQUEST_ME,
    });
  }
  if(Component.getInitialProps){
    pageProps = await Component.getInitialProps(ctx) || {};
  }
  return {pageProps}
};
/////////////////////////////////////////////
const configStore = (initialState, options)=>{

  const sagaMiddleware = createSagaMiddleware(); //사가 연결 --------------
  //devtool 연결 나중에 여긴 필요없을 듯
  //리덕스 성크, 사가,
  const middlewares = [sagaMiddleware, (store) => (next) => (action) => {
    console.log(action);
    next(action)
  }];
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : compose(
    applyMiddleware(...middlewares),
    !options.isServer&& window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
    window.__REDUX_DEVTOOLS_EXTENSION__() :
    (f) => f)
  //
  const store = createStore(rootReducer, initialState, enhancer);
  //sagaMiddleware.run(rootSaga);//사가연결 -------------------------------
  store.sagaTask = sagaMiddleware.run(rootSaga)
  return store
}
export default withRedux(configStore)(withReduxSaga(Main));
//고차 컴포넌트 기존 컴포넌트의 기능을 확정할 때 사용합니다.
