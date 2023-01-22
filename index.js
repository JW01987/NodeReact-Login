const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const { User } = require("./models/User");
const config = require("./config/key");
mongoose.set("strictQuery", false);
mongoose
  .connect(config.mongoURI)
  .then(() => console.log("mongoDB connected..."))
  .catch((e) => console.log(e));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/login", (req, res) => {
  const user = new User(req.body);
  user.save((e, userInfo) => {
    if (e) return res.json({ sucsses: false, e });
    return res.status(200).json({ sucsses: true });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
