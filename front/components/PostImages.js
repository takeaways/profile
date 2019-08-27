import React, {useState,useCallback} from 'react';
import {Icon} from 'antd';
import ImagesZoom from './ImagesZoom';
const PostImages = ({images}) =>{
  const url = 'http://localhost:3065/'
  const [showImagesZoom, setShowImagesZoom] = useState(false);
  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  },[]);

  const onClose = useCallback(e=>{
    setShowImagesZoom(false);
  },[])

  if(images.length === 0) return null
  if(images.length === 1) return (
    <>
      <img src={url+images[0].src} onClick={onZoom}/>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose}/>}
    </>)
  if(images.length === 2){
    return(
      <>
        <div>
          <img src={url+images[0].src} style={{width:"50%"}} onClick={onZoom}/>
          <img src={url+images[1].src} style={{width:"50%"}} onClick={onZoom}/>
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose}/>}
      </>
    )
  }
  return(
    <>
    <div style={{display:'flex'}}>
      <img src={url+images[0].src} style={{width:"50%"}} onClick={onZoom}/>
      <div style={{display:'flex', justifyContent:'space-around', alignItems:'center', width:'50%'}} onClick={onZoom}>
        <div style={{textAlign:'center'}}>
          {images.length - 1}개의 사진 더보기<br/>
          <Icon type="plus"/>
        </div>
      </div>
    </div>
    {showImagesZoom && <ImagesZoom images={images} onClose={onClose}/>}
    </>
  )
}
export default PostImages;
