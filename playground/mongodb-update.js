const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => { //using callback function to check error or get a database object
    if(err){
        return console.log('Unable to connect with mongodb server!'); // this will stop the function executing
    }
    console.log('Connected to mongodb server');
    
    db.collection('todo').findOneAndUpdate({
        _id: new ObjectID('5b870ef57660ec8189a77c05')
    },{
        $set: {
            completed: true
        }
    },{
        returnOriginal: false
    }).then( (result) => {
        console.log('Updated record. ',result);
    }, (err) => {
        if(err){
            return console.log('Something went wrong.', err);
        }
    });




    //close the connection at the end
    db.close();

});