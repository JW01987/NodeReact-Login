const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10; //10자리 소금
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    maxlength: 200,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

//'save'전에 실행할 거 pre()
userSchema.pre("save", function (next) {
  var user = this;
  //몽구스 isModified()
  //파라미터로 들어온 값이
  //db에 기록된 값과 비교해서 변경된 경우는 true를,
  //그렇지 않은 경우는 false를 반환하는 함수입니다.
  if (user.isModified("password")) {
    //genSalt 소금만들기
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else next();
});

userSchema.methods.findPassword = function (plainPassword, callBack) {
  //bcrypt 함수 compare(data1,data2,cb(err,same)) 데이터 같은지 확인
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return callBack(err);
    return callBack(null, isMatch);
  });
};

userSchema.methods.makeToken = function (callBack) {
  const token = jwt.sign(this._id.toHexString(), "secretToken");
  this.token = token;
  this.save((err, user) => {
    if (err) return callBack(err);
    callBack(null, user);
  });
};
//statics 매소드
userSchema.statics.findByToken = function (token, callBack) {
  var user = this;
  //토큰 decoded
  jwt.verify(token, "secretToken", function (e, decoded) {
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return callBack(err);
      return callBack(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
