let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:admin1@ds259250.mlab.com:59250/todos-node-course');

module.exports = {
    mongoose
}