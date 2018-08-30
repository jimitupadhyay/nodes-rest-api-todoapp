var {ObjectID} = require('mongodb');
var {mongoose} = require('./../server/db/mongoose');

var {Todo} = require('./../server/models/todo');
var {User} = require('./../server/models/user');

var _id = '5b874a04d7eb0aef897178dc';

if(ObjectID.isValid(_id)){
    console.log('ID is ok');
}else{
    return console.log('ID IS NOT OKAY');
}


Todo.find({
    _id: _id
}).then( (results) => {
    console.log(results);
}, (err) => {
     console.log('error');
});

Todo.findOne({
    _id: _id
}).then( (results) => {
    console.log(results);
}, (err) => {
     console.log('error');
});


Todo.findById(_id).then( (results) => {
    console.log(results);
}, (err) => {
     console.log('error');
});

