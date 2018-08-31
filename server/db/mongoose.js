var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongodb_jimitupadhyay:mongodb_jimitupadhyay@ds239682.mlab.com:39682/mongodb_jimitupadhyay'|| 'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};