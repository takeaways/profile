import React,{useState,useEffect} from 'react';
import {Menu, Input, Row, Col, Card, Avatar, Form, Button} from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';

const AppLayout = ({children}) => {
 const {isLoggedIn, me} = useSelector(state=> state.user);
  return(
    <>
      <Head>
        <title>PROFILE</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.16.2/antd.css" />
      </Head>
      <Menu mode="horizontal">
        <Menu.Item key="홈"><Link href="/"><a>홈</a></Link></Menu.Item>
        <Menu.Item key="프로필"><Link href="/profile"><a>프로필</a></Link></Menu.Item>
        <Menu.Item key="회원가입"><Link href="/signup"><a>회원가입</a></Link></Menu.Item>
        <Menu.Item key="검색">
          <Input.Search enterButton style={{verticalAlign:'middle'}}/>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={14}>
          {children}
        </Col>
        <Col xs={24} md={4}>
          <Link href="https://github.com/nomadGeonilJang"><a target="_blank">Made by Jang Geonil</a></Link>
        </Col>
      </Row>
    </>
  )
}

AppLayout.propTypes = {
  children: PropTypes.object
}



export default AppLayout;
