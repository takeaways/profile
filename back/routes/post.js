const express = require('express');
const db = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => { // POST /api/post
  try {
    const {postData:{content}} = req.body
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

    //const User = await newPost.getUser();
    //newPost.User = User;
    //res.json(newPost);
    const fullPost = await db.Post.findOne({
      where:{id:newPost.id},
      include:[{
        model:db.User,
        attributes:['nickname']
      }]
    });
    res.json(fullPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/images', (req, res) => {

});

module.exports = router;
