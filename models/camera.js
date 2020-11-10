var mongoose = require('mongoose');
var logger = require("../logger");
const config= require("../config");


const { db: { host, port, name } } = config;

const connectionString = `mongodb://${host}:${port}/${name}`;

mongoose.connect(connectionString, {useMongoClient: true});
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var CameraSchema = new mongoose.Schema({
  title: {type: String, unique: false, required: false, trim: true },
  room_id: {type: String, unique: false, required: false, trim: true },
  ip:  {type: String, required: false, trim: true },
  port:{type:Number},
  video_path_1: {type: String, unique: false, required: false, trim: true },
  video_path_2:  {type: String, unique: false, required: false, trim: true },
  picture_path_1: {type: String, unique: false, required: false, trim: true },
  visible:{type: String,  required: false, trim: true }
},{ strict: false });

var Camera = mongoose.model('Camera', CameraSchema,'Camera');
module.exports = Camera;