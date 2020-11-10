var mongoose = require('mongoose');
var logger = require("../logger");
const config=require("../config");

const { db: { host, port, name } } = config;
const connectionString = `mongodb://${host}:${port}/${name}`;

mongoose.connect(connectionString, {useMongoClient: true});
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var UserSchema = new mongoose.Schema({
  lname: {type: String, required: true, trim: true },
  fname: {type: String, required: true, trim: true },
  email: {type: String, unique: true, required: true, trim: true },
  msisdn:{type: String, required: true, trim: true },
  password: {type: String,required: false}
},{strict:false});

//authenticate input against database
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      //loggi.info(password+" "+user.password);
      if (password==user.password){
        return callback(null, user);
      }else{
        return callback();
      }
    });
}

//hashing a password before saving it to the database



var User = mongoose.model('User', UserSchema,'User');
module.exports = User;