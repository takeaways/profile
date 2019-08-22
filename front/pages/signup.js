import React, {useState, useCallback, useEffect} from 'react';
import {Form, Input, Checkbox, Button, Modal} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import Router from 'next/router';
import {SIGN_UP_REQUEST} from '../reducers/user';

//customeHook
export const useInput = (initValue = null) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback(e => {
    setter(e.target.value);
  },[]);
  return [value, handler];
}

const Signup = () => {
  const dispatch = useDispatch();
  const {isSigningUp, me} = useSelector(state => state.user);
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

  useEffect(()=>{
    if(me.nickname !== "") {
      alert('로그인 되어있습니다.');
      Router.push('/');
    }
  },[me && me.id !== undefined]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if(password !== passwordCheck) return setPasswordError(true);
    if(!term) return setTermError(true);
    dispatch({
      type:SIGN_UP_REQUEST,
      data:{userId:id,nickname,password}
    })
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
          <label htmlFor="user-id">아이디</label>
          <br/>
          <Input name="user-id" required value={id} onChange={onChangeId}/>
        </div>
        <div>
          <label htmlFor="user-nickname">닉네임</label>
          <br/>
          <Input name="user-nickname" required value={nickname} onChange={onChangeNickname}/>
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br/>
          <Input name="user-password" type="password" required value={password} onChange={onChangePassword}/>
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호 확인</label>
          <br/>
          <Input name="user-password-check" type="password" required value={passwordCheck} onChange={onChangePasswordCheck}/>
          {passwordError && <div style={{color:'red'}}>No matched password.</div>}
        </div>
        <div>
          <Checkbox name="user-term" value={term} checked={term} onChange={onChangeTerm}></Checkbox> <a onClick={showModal}>동의하기</a>
          <Modal
            title="사용자 동의"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>불법적인 용도의 개시글을 올리지 않을것을 동의합니다.</p>
          </Modal>
          {termError &&  <div style={{color:'red'}}>You should accept term.</div>}
        </div>
        <div style={{marginTop:10}}>
          <Button type="primary" htmlType="submit" loading={isSigningUp}>회원가입</Button>
        </div>
      </Form>
    </>
  )
}

export default Signup;
