import {useCallback} from 'react';
import {Card, Avatar, Button} from 'antd';

const dummy = {
  isLoggedIn:true,
  nickname:"장건일",
  Posts:[],
  Followings:[],
  Followers:[]
}

const UserProfile = () => {
  const onLogout = useCallback(() =>{
  },[]);
  return (
    <Card
      actions={[
        <div key="twit">팔로<br/>{dummy.Posts.length}</div>,
        <div key="following">Followers<br/>{dummy.Followers.length}</div>,
        <div key="follower">Followings<br/>{dummy.Followings.length}</div>
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{dummy.nickname[0]}</Avatar>}
        title={dummy.nickname}
      />
      <Button>LOGOUT</Button>
    </Card>

  )
}

export default UserProfile;
