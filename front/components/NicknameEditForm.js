import React from 'react';
import {Form, Input, Button} from 'antd'
const NicknameEditForm = () => {
  return (
    <Form style={{ display:"flex", marginBottom:'20px', border:'1px solid #d9d9d9', padding:'20px'}}>
      <Input addonBefore="Nickname"/>
      <Button style={{verticalAlign:'middle',marginLeft:"10px",bottom:'1px'}} type="primary">수정</Button>
    </Form>
  )
}

export default NicknameEditForm;
