const db = require('../models');

exports.isLoggedIn = (req, res, next) =>{
  if(req.isAuthenticated()){
    next();
  }else{
    res.status(401).send('로그인이 필요합니다.');
  }
}


exports.isNotLoggedIn = (req, res, next) =>{
  if(!req.isAuthenticated()){
    next();
  }else{
    res.status(401).send('로그인한 사용자는 접근할 수 없습니다.');
  }
}

exports.exPost = async (req, res, next) => {
  if(req.params){
    const post = db.Post.findOne({
      where:{id:req.params.id}
    })
    if(!post) return res.status.send('포스트가 존재하지 않습니다.');
    next();
  }
}
