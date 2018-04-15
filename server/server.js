const express = require('express');
const bodyParser = require('body-parser');

let {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {Todo} = require('./models/todo');

let app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});


app.listen(3000, () => {
    console.log('Started on port 3000');
});