var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');

var {User} = require('./models/user');
var {Todo} = require('./models/todo');

var app = express();

var port = process.env.PORT || 3000;

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

    Todo.findById(id).then((record) => {
        res.status(200).send({record});
    }, (error) => {
        res.status(404).send({
            "error": "Record not found"
        })
    });


});

// GET /
app.get('/', (req, res) => {
    
        res.status(200).send({
            "MSG": "Server is running "
        });
    


});

app.listen(port,() => {
    console.log(`Server is running on PORT:${port}`);
});

