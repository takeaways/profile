const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');

const router = express.Router();

router.get('/', (req, res) => { // /api/user/
  if(!req.user) res.status(401).send('로그인이 필요합니다.');
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

router.get('/:id', (req, res) => { // 남의 정보 가져오는 것 ex) /api/user/123

});

router.post('/logout', (req, res) => { // /api/user/logout
  req.logout();
  req.session.destroy();
  res.send('logout 성공');
});

router.post('/login', (req, res, next) => { // POST /api/user/login
  //passport 전략 실행 로컬 전략실행후 결과로 콜백의 파라미터로 전달
  passport.authenticate('local',(err, user, info) => {
    if(err){
      console.error(err);
      return next(err);
    }//if
    if(info) return res.status(401).send(info.reason);
    //login(serialze 실행)을 하면 세션과 쿠키가 저장됩니다.
    return req.login(user, async (loginErr) => {
      if(loginErr)return next(loginErr);
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

router.get('/:id/follow', (req, res) => { // /api/user/:id/follow

});
router.post('/:id/follow', (req, res) => {

});

router.delete('/:id/follow', (req, res) => {

});

router.delete('/:id/follower', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

module.exports = router;
