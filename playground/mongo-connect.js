const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/todo', (err, db) => {
    if(err){
        return console.log('Error connecting to mongo', err);
    }else{
        console.log('Connected to MongoDB!');
    }
    // db.collection('Todos').insertOne({
    //     text: 'Something',
    //     completed: false
    // }, (err, result) => {
    //     if(err){
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });
    // db.collection('Users').insertOne({
    //     name: 'Ricardo',
    //     age: 20,
    //     location: 'Tegucigalpa'
    // }).then((result) => {
    //     console.log(result.ops);
    // });
    // db.collection('Users').find({name: 'Ricardo'}).toArray().then((result) => {
    //     console.log(result);
    // });
    // db.collection('Users').findOneAndUpdate({name: 'Ricardo'}, {$set: {name: 'Inti'}, $inc: {age: 1}}, true).then((result) => {
    //     console.log(result);
    // });
    db.collection('Users').find().toArray().then((result) => {
        console.log(result);
    });
    // db.close();


});