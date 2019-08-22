const passport = require('passport');
const {Strategy:LocalStrategy} = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../models');

module.exports = () => {
  passport.use(new LocalStrategy({
    //req.body 의 속성명을 입력
    //userId, passowrd를 아래의 userId 와 password로 사용하겠다
    usernameField:'userId',
    passwordFiled:'password'
  },async(userId, password, done) => {
    //전략 어떤 사람을로그인 시킬것인가
    try {
      const user = await db.User.findOne({where:{userId}});
      if(!user) return done(null, false, {reason:'없는 사용자 입니다.'});
      const result = await bcrypt.compare(password, user.password);
      if(result){
        return done(null, user);
      }
      return done(null, false, {reason:'비밀번호가 틀립니다.'});
    } catch (e) {
      console.error(e);
      return done(e);
    } //catch
  }));
}
