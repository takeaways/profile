import React,{useEffect} from 'react';
import {Form, Input, Button, Icon, Avatar, Card} from 'antd';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import {useDispatch, useSelector} from 'react-redux';
import {LOG_IN, LOG_OUT} from '../reducers/user';


const Home = () => {
  const dispatch = useDispatch();
  const {isLoggedIn} = useSelector(state => state.user);
  const {mainPosts} = useSelector(state => state.post)
  return (
    <>
      {isLoggedIn && <PostForm/>}
       {mainPosts.map((c,i)=>{
         return(
           <PostCard key={+c.createAt} post={c}/>
         )
       })}
    </>

  )
}




export default Home
