import React, {useCallback} from 'react';
import {Form, Button, Input} from 'antd';
import {useInput} from '../pages/signup'

import {useDispatch, useSelector} from 'react-redux';
import {LOG_IN_REQUEST} from '../reducers/user';



const LoginForm = () => {
  const dispatch = useDispatch();
  const {isLoggingIn} = useSelector(state => state.user);
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type:LOG_IN_REQUEST,
      data:{userId:id,password}
    })
  });

  return (
    <>
      <Form onSubmit={onSubmit} style={{paddingLeft:10,paddingRight:10}}>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br/>
          <Input name="user-id" value={id} onChange={onChangeId} required/>
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br/>
          <Input name="user-password" type="password" value={password} onChange={onChangePassword} required/>
        </div>
        <div style={{marginTop:"4px"}}>
          <Button type="primary" htmlType="submit" style={{width:"100%",float:'right'}} loading={isLoggingIn}>로그인</Button>
        </div>
      </Form>
    </>
  )
}
export default LoginForm
