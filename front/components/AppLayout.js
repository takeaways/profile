import React,{useState,useEffect} from 'react';
import {Menu, Input, Row, Col, Card, Avatar, Form, Button} from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';

const dummy = {
  isLoggedIn:true,
  nickname:"장건일",
  Posts:[],
  Followings:[],
  Followers:[]
}

const AppLayout = ({children}) => {
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
        <Col md={6}>
          {dummy.isLoggedIn ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col md={12}>
          {children}
        </Col>
        <Col md={6}>
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
