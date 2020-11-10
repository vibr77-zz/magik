var mongoose = require('mongoose');
var logger = require("../logger");
const config=require("../config");

const { db: { host, port, name } } = config;
const connectionString = `mongodb://${host}:${port}/${name}`;

mongoose.connect(connectionString, {useMongoClient: true});
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var RefObjectSchema = new mongoose.Schema({
  label: {type: String, unique: true, required: true, trim: true },
  file: {type: String, required: false, trim: true },
  object_type: {type: String, required: false, trim: true }
});

var RefObject = mongoose.model('RefObject', RefObjectSchema,'RefObject');
module.exports = RefObject;