import React,{useEffect} from 'react';
import {Form, Input, Button, Icon, Avatar, Card} from 'antd';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import {useDispatch, useSelector} from 'react-redux';
import {LOG_IN, LOG_OUT} from '../reducers/user';
import {LOAD_MAIN_POSTS_REQUEST} from '../reducers/post';


const Home = () => {
  const dispatch = useDispatch();
  const {me} = useSelector(state => state.user);
  const {mainPosts} = useSelector(state => state.post);
  useEffect(()=>{
    dispatch({
      type:LOAD_MAIN_POSTS_REQUEST
    })
  },[])
  return (
    <>
      {me && <PostForm/>}
       {mainPosts.map((c,i)=>{
         return(
           <PostCard key={c.createdAt} post={c}/>
         )
       })}
    </>

  )
}




export default Home
