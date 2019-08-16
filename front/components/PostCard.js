import React,{useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Card, Icon, Button, Avatar, Form, List, Input, Comment} from 'antd';
import PropTypes from 'prop-types';
import {ADD_COMMENT_REQUEST} from '../reducers/post'

//mainPosts 값 전달 index 에서
const PostCard = ({post}) => {
  const dispatch = useDispatch();
  const {me} = useSelector(state=>state.user);
  const {isAddingComment, commentAdded} = useSelector(state=>state.post);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const [commentText, setCommentText] = useState('');
  const onToggleComment = useCallback(() =>{
    setCommentFormOpened(pre => !pre);
  },[]);
  const onChangeCommentText = useCallback((e) =>{
    setCommentText(e.target.value);
  },[]);
  const onSubmitComment = useCallback((e)=>{
    e.preventDefault();
    if(!me) return alert("로그인이 필요합니다.")
    dispatch({
      type:ADD_COMMENT_REQUEST,
      data:{
        postId:post.id,
        comment:commentText
      }
    })
  },[commentText, me && me.id]);


  useEffect(()=>{
    setCommentText("");
  },[commentAdded === true])
  return(
    <div style={{margin:"15px"}}>
      <Card
       key={+post.createAt}
       cover={post.img && <img alt="example" src={post.img}/>}
       actions={[
         <Icon type="retweet" key="retweet"/>,
         <Icon type="heart" key="heart"/>,
         <Icon onClick={onToggleComment} type="message" key="message"/>,
         <Icon type="ellipsis" key="ellipsis"/>,
       ]}
       extra={<Button>팔로우</Button>}
      >
       <Card.Meta
         avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
         title={post.User.nickname}
         description={post.content}
       />
      </Card>
      {commentFormOpened && (
        <>
          <Form onSubmit={onSubmitComment}>
            <Form.Item style={{marginBottom:0}}>
              <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText}/>
            </Form.Item>
            <Button style={{float:'right',zIndex:5000}} type="primary" htmlType="submit" loading={isAddingComment}>댓글등록</Button>
          </Form>
          <List
            header={`${ post.Comments ? post.Comments.length : 0 } 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments || []}
            renderItem={item => (
              <li style={{listStyle:"none"}}>
                <Comment
                  author={item.User.nickname}
                  avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                  content={item.content}
                  datetime={item.createAt}
                />
              </li>
            )}
          />
        </>
      )}
    </div>
  )
}

PostCard.propTypes = {
  post: PropTypes.shape({
    User:PropTypes.object,
    content:PropTypes.string,
    img:PropTypes.string,
    createAt:PropTypes.string
  })
}

export default PostCard
