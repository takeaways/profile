import React,{useEffect,useState,useCallback} from 'react';
import {Form, Input, Button} from 'antd'
import {useDispatch, useSelector} from 'react-redux';
import {EDIT_NICKNAME_REQUEST} from '../reducers/user';

const NicknameEditForm = () => {
  const dispatch = useDispatch();
  const {me, isEditingNickname} = useSelector(state=>state.user);

  const [editedName, setEditedName] = useState('');
  const onChangeName = useCallback(e=>setEditedName(e.target.value));
  const onEditNickname = useCallback((e)=>{
    e.preventDefault();
    dispatch({
      type:EDIT_NICKNAME_REQUEST,
      data:editedName
    });
  },[editedName]);

  return (
    <Form onSubmit={onEditNickname} style={{ display:"flex", marginBottom:'20px', border:'1px solid #d9d9d9', padding:'20px'}}>
      <Input addonBefore="Nickname" value={editedName || (me && me.nickname)} onChange={onChangeName}/>
      <Button htmlType="submit" style={{verticalAlign:'middle',marginLeft:"10px",bottom:'1px'}} type="primary" loading={isEditingNickname}>수정</Button>
    </Form>
  )
}

export default NicknameEditForm;
