import React,{useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Button, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import {ADD_COMMENT_REQUEST, LOAD_COMMENTS_REQUEST} from '../reducers/post'

const CommentForm = ({id}) => {
  const dispatch = useDispatch();
  const {me} = useSelector(state=>state.user);
  const {isAddingComment, commentAdded} = useSelector(state=>state.post);
  const [commentText, setCommentText] = useState(' ');
  const onChangeCommentText = useCallback((e) =>{
    setCommentText(e.target.value);
  },[]);
  const onSubmitComment = useCallback((e)=>{
    e.preventDefault();
    if(!me) return alert("로그인이 필요합니다.")
    dispatch({
      type:ADD_COMMENT_REQUEST,
      data:{
        postId:id,
        comment:commentText
      }
    })
  },[commentText, me && me.id]);

  useEffect(()=>{
    setCommentText("");
  },[commentAdded === true]);

  return(
    <Form onSubmit={onSubmitComment}>
      <Form.Item style={{marginBottom:0}}>
        <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText}/>
      </Form.Item>
      <Button style={{float:'right',zIndex:5000}} type="primary" htmlType="submit" loading={isAddingComment}>댓글등록</Button>
    </Form>
  )
}

export default CommentForm
