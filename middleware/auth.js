const { User } = require("../models/User");
//인증처리
let auth = (req, res, next) => {
  //클라이언트 쿠키에서 토큰 가져오기
  //쿠키 가져오는 법  req.cookie.쿠키이름
  let token = req.cookies.yam_auth;
  //토큰 복호화
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });
    //req에 데이터를 넣어 user,token데이터를 사용할 수 있게 한다
    req.user = user;
    req.token = token;
    next();
  });
  //유저 찾기
};
module.exports = { auth };
