import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Card, Icon, Button, Avatar, Form, List, Input, Comment} from 'antd';
import {LOAD_USER_POSTS_REQUEST} from '../reducers/post'
import {LOAD_USER_REQUEST} from '../reducers/user'
import PostCard from '../components/PostCard'
import axios from 'axios'

const User = () => {
  const dispatch = useDispatch();
  const {mainPosts} = useSelector(state => state.post);
  const {userInfo} = useSelector(state => state.user);
  return(
    <>
      {userInfo
        ? (<Card
            actions={[
              <div key="twit">팔로<br/>{userInfo.Posts}</div>,
              <div key="following">Followers<br/>{userInfo.Followers}</div>,
              <div key="follower">Followings<br/>{userInfo.Followings}</div>
            ]}
          >
            <Card.Meta
              avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
              title={userInfo.nickname}
            />
          </Card>)
        : null
      }
      {mainPosts.map(post=>(
        <PostCard key={post.createdAt} post={post}/>
      ))}
    </>
  )
}

User.getInitialProps = async (context) => {
  context.store.dispatch({
    type:LOAD_USER_REQUEST,
    data:parseInt(context.query.id)
  });
  context.store.dispatch({
    type:LOAD_USER_POSTS_REQUEST,
    data:parseInt(context.query.id)
  })
  return {id:context.query.id}
}
export default User;
