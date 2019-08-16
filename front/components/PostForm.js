import React, {useCallback, useEffect,useState} from 'react';
import {Form, Input, Button } from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {addDummy, ADD_POST_REQUEST} from '../reducers/post';

const dummy = {
  isLoggedIn:true,
  imagePaths:[],
  mainPosts:[{
    id:1,
    createAt:"2019-08-15",
    img:"http://www.earlyadopter.co.kr/wp-content/uploads/2017/06/line_friends_02.jpg",
    User:{
      id:1,
      nickname:"장건일",
    },
    content:"반가워요~",
    Comments:[]
  }]
}

const PostForm = () => {
  const dispatch = useDispatch();
  const {isAddingPost, imagePaths, postAdded} = useSelector(state=>state.post);
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type:ADD_POST_REQUEST,
      data:dummy.mainPosts[0]
    });
  },[]);



  const [text, setText] = useState('');
  const onChangeText = (e)=>{
    setText(e.target.value);
  }

  useEffect(()=>{
    setText('');
  },[postAdded === true]);

  return (
    <Form onSubmit={onSubmit} style={{padding:30}} encType="multipart/form-data">
     <Input.TextArea maxLength={140} value={text} onChange={onChangeText} placeholder="내용..."/>
     <div>
       <Input type="file" multiple hidden/>
       <Button>이미지 업로드</Button>
       <Button type="primary" style={{float:'right'}} htmlType="submit" loading={isAddingPost}>짹짹</Button>
     </div>
       { imagePaths.map((v,i)=>{
         return(
           <div key={v} style={{display:'inline-block'}}>
             <img scr={`http://localhost:3065/${v}`} style={{width:'200px'}} alt={v}/>
             <Button>제거</Button>
           </div>
         )
       })}
    </Form>
  )
}

export default PostForm
