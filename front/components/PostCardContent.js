import Link from 'next/link'
import React from 'react'
const PostCardContent = ({postData}) => {
  return (
    <div>
      {postData.content.split(/(#[^\s]+)/g).map(v=>{
           if(v.match(/#[^\s]+/g)){
             return(
               <Link href={{pathname:'/hashtag', query:{tag:v.slice(1)}}}  as={`/hashtag/${v.slice(1)}`} key={v}>
                <a>{v}</a>
                </Link>
             )
           }
           return v;
         })}
     </div>
  )
}

export default PostCardContent;
