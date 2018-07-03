const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: 1,
        required: true,
        trim: true,
        unique: true,
        validate: {
            isAsync: false,
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access:{
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

//UserSchema.methods contiene instance methodes

UserSchema.methods.toJSON = function (){
    let user = this;
    let userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    let user = this;
    let access = 'auth';
    let token = jwt.sign({_id: user._id.toHexString(), access}, 'secretKey').toString();

    //user.tokens = user.tokens.concat([{access, token}]);
    try{
    user.tokens.push({access, token});
    }catch(e){
        console.log(e);
    }
    return user.save().then(() => {
        return token;
    });
};

//UserSchema.statics contiene model methods
UserSchema.statics.findByToken = function (token) {
    let User = this;
    let decoded;

    try{
        decoded = jwt.verify(token, 'secretKey');
    }catch(err){
        // return new Promise((resolve, reject) => {
        //     reject();
        // });
        return Promise.reject();
    }
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
}


let User = mongoose.model('User', UserSchema);

module.exports = {User};