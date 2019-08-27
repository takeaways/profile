const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');
const {isLoggedIn} = require('./middleware');

const router = express.Router();

router.get('/', isLoggedIn, (req, res) => { // /api/user/
  return res.json(req.user);
});
router.post('/', async (req, res, next) => { // POST /api/user 회원가입
  try {
    const exUser = await db.User.findOne({
      where:{
        userId:req.body.userId,
      }
    })//exUser
    if(exUser) return res.status(403).send('이미 사용중인 아이디입니다.');
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await db.User.create({
      nickname:req.body.nickname,
      userId:req.body.userId,
      password:hashedPassword,
    });//newUser
    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get('/:id', async (req, res, next) => { // 남의 정보 가져오는 것 ex) /api/user/123
  try {
    const user = await db.User.findOne({
      where:{id:parseInt(req.params.id) || (req.user && req.user.id) || 0},
      include:[{
        model:db.Post,
        as:'Posts',
      },{
        model:db.User,
        as:'Followings',
        attributes:['id']
      },{
        model:db.User,
        as:'Followers',
        attributes:['id']
      }],
      attributes:['id','nickname'],
      order: [['createdAt', 'DESC']]
    });
    const jsonUser = user.toJSON();
    jsonUser.Posts = jsonUser.Posts ? jsonUser.Posts.length : 0;
    jsonUser.Followings = jsonUser.Followings ? jsonUser.Followings.length : 0;
    jsonUser.Followers = jsonUser.Followers ? jsonUser.Followers.length : 0;
    res.json(jsonUser);
  } catch (e) {
    console.error(e);
    next(e)
  }
});

router.post('/logout', isLoggedIn, (req, res) => { // /api/user/logout
  req.logout();
  req.session.destroy();
  res.send('logout 성공');
});

router.post('/login', (req, res, next) => { // POST /api/user/login
  //passport 전략 실행 로컬 전략실행후 결과로 콜백의 파라미터로 전달
  passport.authenticate('local', (err, user, info) => {
    if(err){
      console.error(err);
      return next(err);
    }//if
    if(info) return res.status(401).send(info.reason);
    //login(serialze 실행)을 하면 세션과 쿠키가 저장됩니다.
    return req.login(user, async (loginErr) => {
      if(loginErr) return next(loginErr);
      const fullUser = await db.User.findOne({
        where:{id:user.id},
        include:[{
          model:db.Post,
          as:'Posts',
        },{
          model:db.User,
          as:'Followings',
          attributes:['id']
        },{
          model:db.User,
          as:'Followers',
          attributes:['id']
        }],
        attributes:['id','nickname','userId']
      });
      // const filteredUser = Object.assign({}, user.toJSON());
      // delete filteredUser.password;
      return res.json(fullUser);
    });
  })(req,res,next)//authenticate
});


router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const me = await db.User.findOne({where:{id:parseInt(req.user.id)}});
    await me.addFollowing(parseInt(req.params.id));
    res.send(req.params.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/:id/follow', async (req, res, next) => {
  try {
    const me = await db.User.findOne({where:{id:req.user.id}});
    await me.removeFollowing(req.params.id);
    res.send(req.params.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/:id/posts', async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      where:{
        UserId:parseInt(req.params.id) || (req.user && req.user.id) || 0,
        RetweetId:null
      },
      include:[{
        model:db.User,
        attributes:['id','nickname']
      },{
        model:db.Image
      }],
      order: [['createdAt', 'DESC']]
    });
    res.json(posts);
  } catch (e) {
    console.error(e);
    next(e)
  }
});


router.get('/:id/followings', isLoggedIn , async (req, res, next) => { // /api/user/:id/follow
  try {
    console.log(req.query)
    const user = await db.User.findOne({
      where:{id:parseInt(req.user.id) || (req.user && req.user.id) || 0},
    });
    const followings = await user.getFollowings({
      attributes:['id','nickname'],
      limit:parseInt(req.query.limit ? req.query.limit : 3),
      offset:parseInt(req.query.offset ? req.query.offset : 0)
    });
    res.json(followings)
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/:id/followers', isLoggedIn , async (req, res, next) => { // /api/user/:id/follow
  try {
    const user = await db.User.findOne({
      where:{id:parseInt(req.params.id)  || (req.user && req.user.id) || 0},
    });
    const followers = await user.getFollowers({
      attributes:['id','nickname'],
      limit:parseInt(req.query.limit),
      offset:parseInt(req.query.offset)
    });
    res.json(followers)
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/:id/follower', isLoggedIn , async (req, res, next) => {
  try {
    const me = await db.User.findOne({
      where:{id:parseInt(req.user.id)  || (req.user && req.user.id) || 0}
    });
    me.removeFollower(req.params.id);
    res.send(req.params.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.patch('/nickname', isLoggedIn, async (req,res,next)=>{
  try {
    await db.User.update({
      nickname:req.body.nickname
    },{
      where:{id:req.user.id}
    });
    res.json(req.body.nickname);
  } catch (e) {
    console.error(e);
    next(e)
  }
});


module.exports = router;
