const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");

const app = express();
const db = require("./db.json");

app.use(cors());
app.use(bodyParser.json());

app.get("/posts", (req, res) => {
  res.status(200).send(db);
});

app.post("/post", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(404).send({ message: "title or content must be provided" });
  }

  const id = randomBytes(4).toString("hex");

  const post = { id, title, content };

  db.posts.push(post);

  await res.status(200).send({ message: "post created" });
});

app.listen(7777, () => {
  console.log("server turn on port 7777");
});
