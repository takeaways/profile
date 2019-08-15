import React from 'react';
import {Form, Input, Button, Icon, Avatar, Card} from 'antd';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const dummy = {
  isLoggedIn:true,
  imagePaths:[],
  mainPosts:[{
    createAt:"2019-08-15",
    img:"http://www.earlyadopter.co.kr/wp-content/uploads/2017/06/line_friends_02.jpg",
    User:{
      id:1,
      nickname:"장건일",
    },
    content:"반가워요~"
  }]
}

const Home = () => {
  return (
    <>
      {dummy.isLoggedIn && <PostForm/>}
       {dummy.mainPosts.map((c,i)=>{
         return(
           <PostCard key={+c.createAt} post={c}/>
         )
       })}
    </>

  )
}




export default Home
