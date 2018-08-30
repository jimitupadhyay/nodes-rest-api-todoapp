const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => { //using callback function to check error or get a database object
    if(err){
        return console.log('Unable to connect with mongodb server!'); // this will stop the function executing
    }
    console.log('Connected to mongodb server');

    //access the table 
    db.collection('Users').insertOne({ // to insert a record
        name: 'Hiren',
        age: 25,
        location: 'Don-mills'
    }, (error, result) => { // using callback function to return error or result
        if(error){
            return console.log('Unable to insert record in Users table');
        }
        console.log(JSON.stringify(result.ops, undefined, 2)); // result.ops will add all documents/records, undefined - to specify refine data, 2 - specifies spaces
    });

    //close the connection at the end
    db.close();

});