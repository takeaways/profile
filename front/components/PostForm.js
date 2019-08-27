import React, {useCallback, useEffect,useState, useRef} from 'react';
import {Form, Input, Button } from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE} from '../reducers/post';

const PostForm = () => {
  const dispatch = useDispatch();
  const {isAddingPost, imagePaths, postAdded} = useSelector(state=>state.post);


  const [text, setText] = useState('');
  const onChangeText = useCallback((e)=>{
    setText(e.target.value);
  },[])

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if(!text || !text.trim()){
      return alert('게시글을 작성하세요.')
    }
    const formData = new FormData();
    imagePaths.forEach((i)=>{
      formData.append('image',i);
    });
    formData.append('content',text)
    dispatch({
      type:ADD_POST_REQUEST,
      data:formData
    });
  },[text, imagePaths]);

  useEffect(()=>{
    if(postAdded)setText('');
  },[postAdded === true ]);



//이미지 업로드 처리
  const imageInput = useRef(null);
  const onClickImageUpload = useCallback(() => {
   imageInput.current.click();
  },[]);
  const onChangeImages= useCallback((e) => {
    /*e.target.files.foeEach(f=>imageFormData.append(f))*/
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, f => {
      imageFormData.append('image', f);
    },[]);
    dispatch({
      type:UPLOAD_IMAGES_REQUEST,
      data:imageFormData
    });

  },[]);

  const onRemoveImage = useCallback((index) => () => {
    dispatch({
      type:REMOVE_IMAGE,
      index
    });
  },[]);




  return (
    <Form onSubmit={onSubmit} style={{padding:30}} encType="multipart/form-data">
     <Input.TextArea maxLength={140} value={text} onChange={onChangeText} placeholder="내용..."/>
     <div>
       <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages} />
       <Button onClick={onClickImageUpload}>이미지 업로드</Button>
       <Button type="primary" style={{float:'right'}} htmlType="submit" loading={isAddingPost}>짹짹</Button>
     </div>
       { imagePaths.map((v,i)=>{
         return(
           <div key={v} style={{display:'inline-block'}}>
             <img src={`http://localhost:3065/${encodeURIComponent(v)}`} style={{width:'200px'}} alt={v}/>
             <Button onClick={onRemoveImage(i)}>제거</Button>
           </div>
         )
       })}
    </Form>
  )
}

export default PostForm
