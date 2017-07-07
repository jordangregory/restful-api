const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const Todo = require("./models/Todos");
const app = express();
const dbURL = "mongodb://localhost:27017/todos";

app.use(bodyParser.json());
app.use("/static", express.static("static"));

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("Success connected to Mongodb");
  })
  .catch(err => {
    console.log("Error: ", err);
  });

app.get("/api/todos", function(req, res) {
  Todo.find().then(tasks => {
    res.json(tasks);
  });
});
app.post("/api/todos", function(req, res) {
  let task = req.body;
  let newTask = new Todo(task);
  newTask.save().then(item => {
    res.json(item);
  });
});

app.get("/api/todos/:id", (req, res) => {
  Todo.findOne({ _id: req.params.id })
    .then(foundTodo => {
      res.json(foundTodo);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.put("/api/todos/:id", (req, res) => {
  Todo.updateOne({ _id: req.params.id }, req.body)
    .then(updateTodo => {
      res.json(updateTodo);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.patch("/api/todos/:id", (req, res) => {
  Todo.updateOne({ _id: req.params.id }, req.body)
    .then(updateTodo => {
      res.json(updateTodo);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.delete("/api/todos/:id", (req, res) => {
  Todo.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json({ msg: "this has been deleted" });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

// put routes here

app.listen(3000, function() {
  console.log("Express running on http://localhost:3000/.");
});
