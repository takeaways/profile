import {useCallback} from 'react';
import {Card, Avatar, Button} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {LOG_OUT_REQUEST} from '../reducers/user';
import Link from 'next/link'


const UserProfile = () => {
  const dispatch = useDispatch();
  const {me} = useSelector(state => state.user);
  const onLogout = useCallback(() =>{
    dispatch({
      type:LOG_OUT_REQUEST
    });
  },[]);
  return (
    <Card
      actions={[
        <Link href="/profile" key="twit">
          <a><div >팔로<br/>{me.Posts.length}</div></a>
        </Link>,
        <Link href="/profile" key="following">
          <a><div >Followers<br/>{me.Followers.length}</div></a>
        </Link>,
        <Link href="/profile" key="follower">
          <a><div >Followings<br/>{me.Followings.length}</div></a>
        </Link>
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <Button onClick={onLogout} style={{float:'right', verticalAlign:'middle',bottom:25}}>로그아웃</Button>
    </Card>

  )
}

export default UserProfile;
