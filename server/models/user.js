const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ =  require('lodash');

var UserSchema = new mongoose.Schema({
    email:{
        type: String,
        minlength: 1,
        trim: true,
        require: true,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    //user.tokens.push({ access, token});
    user.tokens = user.tokens.concat({access, token});
    return user.save().then(() => {
        return token;
    },(e) => {
        return console.log(e);
    });
}
var User = mongoose.model('User', UserSchema);

module.exports = {User};