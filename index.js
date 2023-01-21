const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://jean:jean1997!@cluster0.vy1cknt.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("mongoDB connected..."))
  .catch((e) => console.log(e));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
