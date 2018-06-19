// let env = process.env.NODE_ENV;

// if(env === 'development'){
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = "mongodb://localhost:27017/TodoApp";
// }else if(env === 'test'){
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = "mongodb://localhost:27017/TodoAppTest";
// }

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

let { mongoose } = require('./db/mongoose');
const { User } = require('./models/user');
const { Todo } = require('./models/todo');
const { ObjectID } = require('mongodb');

let app = express();
const port = process.env.PORT || 3000;

console.log('Puerto es: ',port);

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

//PATCH

app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed']);
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
});

//POST /users

app.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    let user = new User(body);

    user.save().then((doc) => {
        res.send(doc);
    }).catch((e) => {
        res.status(400).send(e);
    });
});



app.listen(port, () => {
    console.log('Started on port '+port);
});

module.exports = {app};