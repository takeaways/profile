import React, {useCallback} from 'react';
import {Form, Button, Input} from 'antd';
import {useInput} from '../pages/signup'



const LoginForm = () => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const onSubmit = useCallback((e) => {
    e.preventDefault();
  });

  return (
    <>
      <Form onSubmit={onSubmit} style={{paddingLeft:10}}>
        <div>
          <label htmlFor="user-id">ID</label>
          <br/>
          <Input name="user-id" value={id} onChange={onChangeId} required/>
        </div>
        <div>
          <label htmlFor="user-password">PASSWORD</label>
          <br/>
          <Input name="user-password" type="password" value={password} onChange={onChangePassword} required/>
        </div>
        <div style={{marginTop:"4px"}}>
          <Button type="primary" htmlType="submit" style={{float:'right'}}>LOGIN</Button>
        </div>
      </Form>
    </>
  )
}
export default LoginForm
