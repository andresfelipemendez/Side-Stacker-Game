const mongoose = require('mongoose');
const mongodbUri = process.env.MONGODB_URI;

var _db;
 
module.exports = {
  connectToServer: function (callback) {
    console.log("connecting to database");
    mongoose.connect(mongodbUri, (err) => {
        if(err) {
            console.log(err);
            return callback("error conecting to database",err);
        }
        console.log("successfully connected to database");
        _db = mongoose.connection;
    });
  },
 
  getDb: function () {
    return _db;
  },
};