import React,{useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {LOAD_HASHTAG_POSTS_REQUEST} from '../reducers/post'
import PostCard from '../components/PostCard'
import PropTypes from 'prop-types';

const Hashtag = () => {
  const dispatch = useDispatch();
  const {mainPosts} = useSelector(state => state.post);
  return(
    <>
      {mainPosts.map(post=>(
        <PostCard key={post.createdAt} post={post}/>
      ))}
    </>
  )
}

Hashtag.propTypes = {
  tag:PropTypes.string
}

Hashtag.getInitialProps = async (context) => {
  context.store.dispatch({
    type:LOAD_HASHTAG_POSTS_REQUEST,
    data:context.query.tag
  })


  return {tag:context.query.tag}
}
export default Hashtag;
