var mongoose = require('mongoose');
var logger = require("../logger");
const config= require("../config");


const { db: { host, port, name } } = config;

const connectionString = `mongodb://${host}:${port}/${name}`;

mongoose.connect(connectionString, {useMongoClient: true});
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var AlarmSchema = new mongoose.Schema({
  execution_mode:{type:Number},
},{ strict: false });

var Alarm = mongoose.model('Alarm', AlarmSchema,'Alarm');
module.exports = Alarm;