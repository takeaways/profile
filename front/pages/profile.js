import React from 'react';
import {Form, Button, Input, List, Icon, Card} from 'antd';
import NicknameEditForm from '../components/NicknameEditForm';

const Profile = () => {
  return (
    <div style={{padding:"40px"}}>
      <NicknameEditForm />
      <List
        style={{marginBottom:'20px'}}
        grid={{gutter:4, xs:2, md:3}}
        size="small"
        header={<div>팔로우 목록</div>}
        loadMore={<Button style={{width:'100%'}}>더 보기</Button>}
        bordered
        dataSource={['장건일','배수지','류진']}
        renderItem={item=>(
          <List.Item style={{marginTop:'20px'}}>
            <Card action={[<Icon key="stop" type="stop"/>]}>
              <Card.Meta description={item}/>
            </Card>
          </List.Item>
        )}
      />
      <List
        style={{marginBottom:'20px'}}
        grid={{gutter:4, xs:2, md:3}}
        size="small"
        header={<div>팔로워 목록</div>}
        loadMore={<Button style={{width:'100%'}}>더 보기</Button>}
        bordered
        dataSource={['장건일','배수지','류진']}
        renderItem={item=>(
          <List.Item style={{marginTop:'20px'}}>
            <Card action={[<Icon key="stop" type="stop"/>]}>
              <Card.Meta description={item}/>
            </Card>
          </List.Item>
        )}
      />
    </div>

  )
}

export default Profile
