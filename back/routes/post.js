const express = require('express');
const path = require('path');
const multer = require('multer');
const db = require('../models');
const {isLoggedIn, exPost} = require('./middleware');

const router = express.Router();

const upload = multer({
  //storage 설정으로 이미지를 어디에 저장할 지 설정 할 수 있습니다.
  storage:multer.diskStorage({
    destination(req, file, done){
      done(null, 'uploads')
    },
    filename(req, file, done){
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename+new Date().valueOf() + ext);
    },
    limits:{fileSize:20 *  1024 * 1024}
  }),
});
router.post('/images', upload.array('image'), (req, res) => {
  //upload.sing -> req.file
  res.json(req.files.map(v=>v.filename));
});
//
router.post('/', isLoggedIn, upload.none(), async (req, res, next) => { // POST /api/post
  try {
    const {content} = req.body
    const hashtags = content.match(/#[^\s]+/g);
    const newPost = await db.Post.create({
      content,
      UserId:req.user.id,
    });//newPost
    if(hashtags){
      const result = await Promise.all(hashtags.map(tag => db.Hashtag.findOrCreate({
        where:{name:tag.slice(1).toLowerCase()}
      })));//map
      await newPost.addHashtags(result.map(r=>r[0]));
    }
    if(req.body.image){//[a1,a2,a3]
      if(Array.isArray(req.body.image)){
        const images = await Promise.all(req.body.image.map(v => {
          return db.Image.create({src:v});
        }));
        await newPost.addImages(images);
      }else{//address1
        const image = await db.Image.create({src:req.body.image});
        await newPost.addImage(image)
      }
    }
    //const User = await newPost.getUser();
    //newPost.User = User;
    //res.json(newPost);
    const fullPost = await db.Post.findOne({
      where:{id:newPost.id},
      include:[{
        model:db.User,
        attributes:['id','nickname']
      },{
        model:db.Image,
      },{
        model:db.User,
        through:'Like',
        as:'Likers',
        attributes:['id']
      }],
      order: [['createdAt', 'DESC']]
    });
    res.json(fullPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/:id/comments',exPost, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({where:{id:req.params.id}});
  //  if(!post) return res.status(404).send('포스트가 존재하지 않습니다.');
    const comments = await db.Comment.findAll({
      where:{
        postId:req.params.id
      },
      order:[['createdAt','ASC']],
      include:[{
        model:db.User,
        attributes:['id','nickname']
      }]
    });
    res.json(comments);
  } catch (e) {
    console.error(e);
    next(e)
  }
});

router.post('/:id/comment', isLoggedIn,exPost, async (req, res, next)=>{
  try {
    const post = await db.Post.findOne({where:{id:req.params.id}});
    //if(!post) return res.status(404).send('포스트가 존재하지 않습니다.');
    const newComment = await db.Comment.create({
      PostId:post.id,
      UserId:req.user.id,
      content:req.body.comment
    });
    await post.addComment(newComment.id);
    const comment = await db.Comment.findOne({
      where:{id:newComment.id},
      include:[{model:db.User,attributes:['id','nickname']}]
    });
    return res.json(comment)
  } catch (e) {
    console.error(e);
    next(e)
  }
});

router.post(`/:id/like`, isLoggedIn, exPost, async(req, res,next)=>{
  try {
    const post = await db.Post.findOne({where:{id:req.params.id}});
    //if(!post)return res.status(404).send('포스트가 없습니다.')
    await post.addLiker(req.user.id);
    res.json({userId:req.user.id})
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete(`/:id/like`, isLoggedIn, exPost ,async(req, res,next)=>{
  try {
    const post = await db.Post.findOne({where:{id:req.params.id}});
    //if(!post)return res.status(404).send('포스트가 없습니다.')
    await post.removeLiker(req.user.id);
    res.json({userId:req.user.id})
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post(`/:id/retweet`, isLoggedIn, exPost, async(req, res, next)=>{
  try {
    const post = await db.Post.findOne({where:{id:req.params.id}});
    if(req.user.id === post.UserId) return res.status(403).send('자신의 포스트는 리트윗 불가')
    const retweetTargetId = post.RetweetId || post.id
    const existPost = await db.Post.findOne({
      where:{
        UserId:req.user.id,
        RetweetId:retweetTargetId,
      }
    });
    if(existPost) return res.status(403).send('이미 리트윗 했습니다.');
    const retweet = await db.Post.create({
      UserId:req.user.id,
      RetweetId:retweetTargetId,
      content:'retweet',
    });
    const retweetWithPrevPost = await db.Post.findOne({
      where:{id:retweet.id},
      include:[{
        model:db.User,
        attributes:['id','nickname']
      },{
        model:db.User,
        through:'Like',
        as:'Likers',
        attributes:['id']
      },{
        model:db.Post,
        as:'Retweet',
        include:[{
          model:db.User,
          attributes:['id','nickname']
        },{
          model:db.Image
        }]
      }]
    });
    res.json(retweetWithPrevPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
})


router.delete(`/:id`, isLoggedIn, exPost ,async(req, res,next)=>{
  try {
    await db.Post.destroy({where:{id:req.params.id}});
    res.send(req.params.id)
  } catch (e) {
    console.error(e);
    next(e);
  }
});



module.exports = router;
