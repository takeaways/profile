import React, {useState, useCallback, useEffect} from 'react';
import {Form, Input, Checkbox, Button, Modal} from 'antd';
import {useDispatch, useSelector} from 'react-redux';

import Router from 'next/router';

//customeHook
export const useInput = (initValue = null) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback(e => {
    setter(e.target.value);
  },[]);
  return [value, handler];
}

const Signup = () => {

  //Modal
  const [visible, setVisible] = useState(false);
  const showModal = useCallback(() => {
    setVisible(true);
  },[]);
  const handleOk = useCallback(e => {
    setTerm(true);
    setVisible(false);
  },[]);
  const handleCancel = useCallback(e => {
    setTerm(false);
    setVisible(false);
  },[]);

  const [id, onChangeId] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);


  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if(password !== passwordCheck) return setPasswordError(true);
    if(!term) return setTermError(true);
  },[id, nickname, passwordCheck, password, term]);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordError(false);
    setPasswordCheck(e.target.value)
  },[]);
  const onChangeTerm = useCallback((e) => {
    setTermError(false);
    setTerm(e.target.checked);
  },[]);

  return (
    <>
      <Form onSubmit={onSubmit} style={{padding:40}}>
        <div>
          <label htmlFor="user-id">ID</label>
          <br/>
          <Input name="user-id" required value={id} onChange={onChangeId}/>
        </div>
        <div>
          <label htmlFor="user-nickname">NICKNAME</label>
          <br/>
          <Input name="user-nickname" required value={nickname} onChange={onChangeNickname}/>
        </div>
        <div>
          <label htmlFor="user-password">PASSWORD</label>
          <br/>
          <Input name="user-password" type="password" required value={password} onChange={onChangePassword}/>
        </div>
        <div>
          <label htmlFor="user-password-check">PASSWORD CHECK</label>
          <br/>
          <Input name="user-password-check" type="password" required value={passwordCheck} onChange={onChangePasswordCheck}/>
          {passwordError && <div style={{color:'red'}}>No matched password.</div>}
        </div>
        <div>
          <Checkbox name="user-term" value={term} checked={term} onChange={onChangeTerm}></Checkbox> <a onClick={showModal}>Accept</a>
          <Modal
            title="Accept Modal"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>동의합니다.</p>
          </Modal>
          {termError &&  <div style={{color:'red'}}>You should accept term.</div>}
        </div>
        <div style={{marginTop:10}}>
          <Button type="primary" htmlType="submit" >Register</Button>
        </div>
      </Form>
    </>
  )
}

export default Signup;
