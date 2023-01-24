const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;

let idCounter = 5;
let users = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    username: "Karianne",
    email: "Julianne.OConner@kory.org",
  },
];

app.use(cors());
app.use(bodyParser.json);

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const selectedUser = users.find((user) => user.id == id);
  if (selectedUser) {
    res.send(selectedUser);
  } else {
    res.status(404).json({ message: "there is no such user..." });
  }
});

//delete by id

app.delete("/users/:id", (req, res) => {
  const id = +req.params.id;
  users = users.filter((q) => q.id !== id);
  res.status(200).json({ message: "seccesfuly delete" });
});

//post new users
app.post("/users", (req, res) => {
  console.log(req.body);
  const userObj = {
    id: idCounter++,
    name: req.body.name,
    username: req.body.username,
  };

  users.push(userObj);
});

//put

app.put("/users/:id", (req, res) => {
const id=+req.params.id;
 users= users.filter((elem)=>elem.id !==id);

 const updateUser={
  id: id,
  name: req.body.name,
  username: req.body.username,
 }
 users.push(updateUser);
 });


app.listen(port, () => {
  console.log(`this app is listining on port ${port}`);
});
