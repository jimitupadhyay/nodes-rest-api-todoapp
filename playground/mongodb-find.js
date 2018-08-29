const {MongoClient, ObejctId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => { //using callback function to check error or get a database object
    if(err){
        return console.log('Unable to connect with mongodb server!'); // this will stop the function executing
    }
    console.log('Connected to mongodb server');
    //finD() returns the mongodb cursor, to access cursor we use toArray, toArray returns the promise
    db.collection('todo').find({completed: null}).toArray().then((docs)=>{
        console.log('\'todo\' Table ');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        if(err){
            return console.log('Unable to find matching records');
        }
    });

    //to count the table records
    db.collection('Users').find().count().then((count) => {
        console.log(`Users total records - ${count}`);
    }, (err) => {
        return console.log('Unable to count the records');
    });


    //close the connection at the end
    db.close();

});