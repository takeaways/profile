import React from 'react';
import {Form, Input, Button } from 'antd';

const dummy = {
  isLoggedIn:true,
  imagePaths:[],
  mainPosts:[{
    createAt:"2019-08-15",
    img:"http://www.earlyadopter.co.kr/wp-content/uploads/2017/06/line_friends_02.jpg",
    User:{
      id:1,
      nickname:"장건일",
    },
    content:"반가워요~"
  }]
}

const PostForm = () => {
  return (
    <Form style={{padding:30}} encType="multipart/form-data">
     <Input.TextArea maxLength={140} placeholder="내용..."/>
     <div>
       <Input type="file" multiple hidden/>
       <Button>이미지 업로드</Button>
       <Button type="primary" style={{float:'right'}} htmlType="submit">짹짹</Button>
     </div>
       {dummy.imagePaths.map((v,i)=>{
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
