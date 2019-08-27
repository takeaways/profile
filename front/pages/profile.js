import React,{useEffect,useCallback} from 'react';
import {Form, Button, Input, List, Icon, Card} from 'antd';
import NicknameEditForm from '../components/NicknameEditForm';
import {useDispatch, useSelector} from 'react-redux';
import {
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  REMOVE_FOLLOWER_REQUEST,
  UNFOLLOW_USER_REQUEST,
} from '../reducers/user';
import {  LOAD_USER_POSTS_REQUEST} from '../reducers/post'

import PostCard from '../components/PostCard'

const Profile = () => {
  const dispatch = useDispatch();
  const {me, followerList, followingList, hasMoreFollower, hasMoreFollowing} = useSelector(state=>state.user);
  const {mainPosts} = useSelector(state=>state.post);
  const onUnfollow = useCallback((id) => ()=>{
    dispatch({
      type:UNFOLLOW_USER_REQUEST,
      data:id
    })
  },[]);

  const onRemoveFollower = useCallback((id) => ()=>{
    alert("팔로워를 지웁니다")
    dispatch({
      type:REMOVE_FOLLOWER_REQUEST,
      data:id
    })
  },[]);

  const loadMoreFollowings = useCallback(()=>{
    dispatch({
      type:LOAD_FOLLOWINGS_REQUEST,
      data:{
        userId:me.id,
        offset:followingList.length
      }
    })
  },[followingList.length]);
  const loadMoreFollowers = useCallback(()=>{
    dispatch({
      type:LOAD_FOLLOWERS_REQUEST,
      data:{
        userId:me.id,
        offset:followerList.length
      }
    })
  },[followerList.length]);


  return (
    <div style={{padding:"40px"}}>
      <NicknameEditForm />
      <List
        style={{marginBottom:'20px'}}
        grid={{gutter:4, xs:2, md:3}}
        size="small"
        header={<div>팔로잉 목록</div>}
        loadMore={hasMoreFollowing && <Button onClick={loadMoreFollowings} style={{width:'100%'}}>더 보기</Button>}
        bordered
        dataSource={followingList}
        renderItem={item=>(
          <List.Item style={{marginTop:'20px'}}>
            <Card actions={[<Icon key="stop" type="stop" onClick={onUnfollow(item.id)}/>]}>
              <Card.Meta description={item.nickname}/>
            </Card>
          </List.Item>
        )}
      />
      <List
        style={{marginBottom:'20px'}}
        grid={{gutter:4, xs:2, md:3}}
        size="small"
        header={<div>팔로워 목록</div>}
        loadMore={hasMoreFollower && <Button onClick={loadMoreFollowers} style={{width:'100%'}}>더 보기</Button>}
        bordered
        dataSource={followerList}
        renderItem={item=>(
          <List.Item style={{marginTop:'20px'}}>
            <Card actions={[<Icon key="stop" type="stop" onClick={onRemoveFollower(item.id)}/>]}>
              <Card.Meta description={item.nickname}/>
            </Card>
          </List.Item>
        )}
      />
      <div>
        {mainPosts.map(post=>(
          <PostCard key={post.createdAt} post={post}/>
        ))}
      </div>
    </div>

  )
}


Profile.getInitialProps = async (context) => {
  const state = context.store.getState();
  //if(state.user.followerList.length === 0 && state.user.followingList.length ===0){
  context.store.dispatch({
    type:LOAD_FOLLOWERS_REQUEST,
    data:{
      userId:state.user.me && state.user.me.id,
      offset:0,
    }
  });
  context.store.dispatch({
    type:LOAD_FOLLOWINGS_REQUEST,
    data:{
      userId:state.user.me && state.user.me.id,
      offset:0,
    }
  });
//}
  context.store.dispatch({
    type:LOAD_USER_POSTS_REQUEST,
    data:state.user.me && state.user.me.id
  });
}

export default Profile
