import React,{useState, useEffect, useCallback, memo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Link from 'next/link'
import {Card, Icon, Button, Avatar, Form, List, Input, Comment, Popover } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';
moment.locale('ko');
import {
   LOAD_MAIN_POSTS_REQUEST,
   ADD_COMMENT_REQUEST,
   LOAD_COMMENTS_REQUEST,
   UNLIKE_POST_REQUEST,
   LIKE_POST_REQUEST,
   RETWEET_REQUEST,
   REMOVE_POST_REQUEST
} from '../reducers/post'
import {
  UNFOLLOW_USER_REQUEST,
  FOLLOW_USER_REQUEST
} from '../reducers/user'
import PostImages from './PostImages';
import CommentForm from './CommentForm'
import PostCardContent from './PostCardContent'
import FollowButton from './FollowButton';

import styled from 'styled-components';
const CardWraper = styled.div`
  marginBottom:15px;
`

//mainPosts 값 전달 index 에서
const PostCard = memo(({post}) => {
  const dispatch = useDispatch();
  const {retweeted} = useSelector(state=>state.post);
  const id = useSelector(state=>state.user.me && state.user.me.id);
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  const onToggleComment = useCallback(() =>{
    setCommentFormOpened(pre => !pre);
    if(!commentFormOpened){
      dispatch({
        type:LOAD_COMMENTS_REQUEST,
        data:post.id
      })
    }
  },[post]);


  const liked = id && post.Likers && post.Likers.find(v=> v.id === id);
  const onToggleLike = useCallback((e) => {
    if(!id) return alert('로그인이 필요합니다.');
    if(liked){
      dispatch({
        type:UNLIKE_POST_REQUEST,
        data:post.id
      })
    }else{
      dispatch({
        type:LIKE_POST_REQUEST,
        data:post.id,
      })
    }
  },[id, post && post.id, liked]);

  const onRetweet = useCallback(e=>{
    if(!id) return alert('로그인이 필요합니다.');
    dispatch({
      type:RETWEET_REQUEST,
      data:post.id
    });
  },[id, post && post.id]);

  const onUnfollow = useCallback((userId) => () =>{
    dispatch({
      type:UNFOLLOW_USER_REQUEST,
      data:userId,
    })
  },[])
  const onFollow = useCallback((userId) => () =>{
    dispatch({
      type:FOLLOW_USER_REQUEST,
      data:userId,
    })
  },[])

  const onDelete = useCallback((postId) => () => {
    dispatch({
      type:REMOVE_POST_REQUEST,
      data:postId
    })
  },[]);


  return(
    <CardWraper style={{margin:"15px"}}>
      <Card
       cover={post.Images && <PostImages images={post.Images}/>}
       actions={[
         <Icon onClick={onRetweet} type="retweet" key="retweet"/>,
         <Icon onClick={onToggleLike} theme={liked ? 'twoTone':'outlined'} type="heart" key="heart"/>,
         <Icon onClick={onToggleComment} type="message" key="message"/>,
         <Popover
          key="ellipsis"
          content={(
            <Button.Group>
              {id && post.UserId === id
                ? (<>
                    <Button>수정</Button>
                    <Button onClick={onDelete(post.id)} type="danger">삭제</Button>
                  </>)
                :<Button>신고</Button>
              }
            </Button.Group>
          )}
         >
         <Icon type="ellipsis"/>
         </Popover>
       ]}
       title={post.RetweetId ? `${post.User.nickname}님이 리트윗 하셨습니다.` : null}
       extra={<FollowButton post={post} onUnfollow={onUnfollow} onFollow={onFollow}/>}
      >
      {post.RetweetId && post.Retweet ? (
        <Card
          key={+post.Retweet.createAt}
          cover={post.Retweet.Images && <PostImages images={post.Retweet.Images}/>}
        >
          <Card.Meta
            avatar={(
              <Link href={{pathname:'/user', query: { id:post.Retweet.User.id } }} as={`/user/${post.Retweet.User.id}`}>
                <a>
                 <Avatar>{post.Retweet.User.nickname[0]}</Avatar>
                </a>
              </Link>
            )}
            title={post.Retweet.User.nickname}
            description={<PostCardContent postData={post.Retweet} />}
          />
          {moment(post.createAt).format('YYYY.MM.DD')}
        </Card>
        )
       :(
         <Card.Meta
           avatar={(
             <Link href={{pathname:'/user', query: { id:post.User.id } }} as={`/user/${post.User.id}`}>
               <a>
                <Avatar>{post.User.nickname[0]}</Avatar>
               </a>
             </Link>
           )}
           title={post.User.nickname}
           description={<PostCardContent postData={post} />}
         />
        )
      }
      </Card>
      {commentFormOpened && (
        <>
          <CommentForm id={post.id}/>
          <List
            header={`${ post.Comments ? post.Comments.length : 0 } 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments || []}
            renderItem={item => (
              <li style={{listStyle:"none"}}>
                <Comment
                  author={item.User.nickname}
                  avatar={(
                    <Link href={{pathname:'/user', query: {id:item.User.id} }} as={`/user/${item.User.id}`}>
                      <a>
                       <Avatar>{item.User.nickname[0]}</Avatar>
                      </a>
                    </Link>
                )}
                  content={item.content}
                  datetime={item.createAt}
                />
              </li>
            )}
          />
        </>
      )}
    </CardWraper>
  )
});

PostCard.propTypes = {
  post: PropTypes.shape({
    User:PropTypes.object,
    content:PropTypes.string,
    img:PropTypes.string,
    createAt:PropTypes.string
  })
}

export default PostCard
