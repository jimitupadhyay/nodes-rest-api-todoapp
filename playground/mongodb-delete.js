const {MongoClient, ObejctId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => { //using callback function to check error or get a database object
    if(err){
        return console.log('Unable to connect with mongodb server!'); // this will stop the function executing
    }
    console.log('Connected to mongodb server');
    
    //deleteMany - deletes many records
    db.collection('todo').deleteMany({text: 'To do something'}).then( (result) => { 
        console.log(result);
    }, (err) => {
        if(err){
            return console.log('Unable to delete the records... Please, try again.');
        }

    });

    //deleteOne - deletes only one record
    db.collection('todo').deleteOne({completed: null}).then( (result) => {
        console.log(result);
    }, (err) => {
        if(err){
            return console.log('Unable to delete. Please, try again.');
        }
    });


    //findOneAndDelete - when we want to know which record is getting deleted, beacause it returns the same records the is being deleted
    //To delete unique record.
    db.collection('todo').findOneAndDelete({completed: false}).then( (result) => {
        console.log(result);
    }, (err) => {
        return console.log('Unable to delete... Please, try again.');
    });




    //close the connection at the end
    db.close();

});