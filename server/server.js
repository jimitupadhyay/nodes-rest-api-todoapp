require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');

var {User} = require('./models/user');
var {Todo} = require('./models/todo');

var app = express();

var port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos',(req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then( (result) => {
        res.status(200).send(result);
    }, (e) => {
        res.status(400).send(e);
    });

});

app.get('/todos',(req, res) =>{
    Todo.find().then( (result) => {
        res.status(200).send({result});
    }, (err) => {
        res.status(400).send(e);
    });
});

// GET /todos/123
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send({
            "msg": "ID not valid"
        });
    }

    Todo.findById(id).then((record) => {
        if(!record){
            return res.status(404).send({
                "msg": "Record not found"
            });
        }
        res.status(200).send({record});
    }).catch((e) => {
        res.status(404).send({
            "error": "Record not found"
        });
    });


});

// GET /
app.get('/', (req, res) => {
    
        res.status(200).send({
            "MSG": "Server is running "
        });
});


//DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(404).send({
            "msg": "ID not valid"
        });
    }

    Todo.findByIdAndRemove(id).then((record) => {
        res.status(200).send({record});
    }).catch((e) => {
        res.status(404).send({
            "error": "Record not found"
        });
    });
});

app.patch('/todo/:id', (req, res) => {
    var id = req.params.id;

    var body = _.pick(req.body, ['text','completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send({
            "msg": "ID not valid"
        });
    }
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completedAt = null;
        body.completed = false;
    }
    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((result) => {
        if(!result){
            return res.status(404).send();
        }
        res.status(200).send({result});
    }).catch( (e) => {
        res.status(404).send({
            "error": "Record not found"
        });
    });
}, (e) => {

});



//POST Users
app.post("/users", (req, res) => {
    let body = _.pick(req.body, ['email','password']);

    let user = User(body);

    //User.findByToken
    


    user.save().then(() => {
        return user.generateAuthToken();
       
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
    });
});


app.listen(port,() => {
    console.log(`Server is running on PORT:${port}`);
});

//heroku git:remote -a obscure-basin-81483