const express = require('express');
const bodyParser = require('body-parser');

let { mongoose } = require('./db/mongoose');
const { User } = require('./Models/user');
const { Todo } = require('./Models/todo');
const { ObjectID } = require('mongodb');

let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

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

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    }).catch((e) => console.log(e));
});


//GET

app.get('/todos/:id', (req, res) => {
    // res.send(req.params);
    let id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if(!todo){
            res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = {app};