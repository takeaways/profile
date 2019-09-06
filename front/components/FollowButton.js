import React from 'react';
import {Button} from 'antd';
import {useSelector} from 'react-redux'

const FollowButton = ({post, onUnfollow, onFollow}) => {
  const {me} = useSelector(state => state.user)
  return (
    !me || post.User.id === me.id
      ? null
      : me.Followings && me.Followings.find( v => v.id ===post.User.id)
        ? <Button onClick={onUnfollow(post.User.id)}>팔로취소</Button>
        : <Button onClick={onFollow(post.User.id)}>팔로우</Button>
  )
}

export default FollowButton
