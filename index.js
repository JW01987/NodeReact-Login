const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const { User } = require("./models/User");
const config = require("./config/key");
const cookieParser = require("cookie-parser");

mongoose.set("strictQuery", false);
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("mongoDB connected..."))
  .catch((e) => console.log(e));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((e, userInfo) => {
    if (e) return res.json({ sucsses: false, e });
    return res.status(200).json({ sucsses: true });
  });
});

app.post("/login", (req, res) => {
  //요청된 이메일 찾기
  User.findOne({ email: req.body.email }, (err, userData) => {
    if (!userData) {
      return res.json({
        loginSuccess: false,
        message: "해당 이메일이 존재하지 않습니다",
      });
    }
    //이메일이 db에 있다면 비번 확인
    userData.findPassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ sucsses: false, message: "비밀번호가 틀렸습니다" });
      //토큰생성
      userData.makeToken((err, user) => {
        if (err) return res.status(400).send(err);
        //토큰제작 성공! 어디에 저장할지~
        res
          .cookie("yam_auth", user.token)
          .status(200)
          .json({ loginSucsses: true, user: user._id });
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
