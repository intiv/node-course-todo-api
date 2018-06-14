const express = require('express');
const bodyParser = require('body-parser');

let { mongoose } = require('./db/mongoose');
const { User } = require('./Models/user');
const { Todo } = require('./Models/todo');
const { ObjectID } = require('mongodb');

let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());


//POST /todos

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});


//GET /todos

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    }).catch((e) => console.log(e));
});

app.get('/todos/:id', (req, res) => {
    // res.send(req.params);
    let id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

//DELETE /todos

app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.status(200).send({todo});
    }).catch((e) => {
        res.send(400).send();
    });
});

app.listen(port, () => {
    console.log('Started on port 3000');
});

module.exports = {app};