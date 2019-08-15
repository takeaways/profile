import {useCallback} from 'react';
import {Card, Avatar, Button} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {LOG_IN, LOG_OUT} from '../reducers/user';


const UserProfile = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const onLogout = useCallback(() =>{
    dispatch({
      type:LOG_OUT
    });
  },[]);
  return (
    <Card
      actions={[
        <div key="twit">팔로<br/>{user.Posts.length}</div>,
        <div key="following">Followers<br/>{user.Followers.length}</div>,
        <div key="follower">Followings<br/>{user.Followings.length}</div>
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{user.nickname[0]}</Avatar>}
        title={user.nickname}
      />
      <Button onClick={onLogout} style={{float:'right', verticalAlign:'middle',bottom:25}}>로그아웃</Button>
    </Card>

  )
}

export default UserProfile;
