import React,{useEffect, useCallback} from 'react';
import {Form, Input, Button, Icon, Avatar, Card} from 'antd';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import {useDispatch, useSelector} from 'react-redux';
import {LOG_IN, LOG_OUT} from '../reducers/user';
import {LOAD_MAIN_POSTS_REQUEST} from '../reducers/post';


const Home = () => {
  const dispatch = useDispatch();
  const {me} = useSelector(state => state.user);
  const {mainPosts, hasMorePost} = useSelector(state => state.post);

  const onScroll = useCallback(() => {
    if(hasMorePost){
      if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300){
        dispatch({
          type:LOAD_MAIN_POSTS_REQUEST,
          lastId:mainPosts[mainPosts.length - 1].id,
        })
      }
    }
  },[mainPosts.length, hasMorePost]);

  useEffect(()=>{
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    }
  },[mainPosts && mainPosts.length])


  return (
    <>
      {me && <PostForm/>}
       {mainPosts.map((c,i)=>{
         return(
           <PostCard key={c.createdAt+i} post={c}/>
         )
       })}
    </>

  )
}

Home.getInitialProps = async(context) => {
  context.store.dispatch({
    type:LOAD_MAIN_POSTS_REQUEST,
    lastId:0
  })
}


export default Home
