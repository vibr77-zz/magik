var mongoose = require('mongoose');
var logger = require("../logger");
const config=require("../config");

const { db: { host, port, name } } = config;
const connectionString = `mongodb://${host}:${port}/${name}`;

mongoose.connect(connectionString, { useNewUrlParser: true ,useUnifiedTopology: true}/*{useMongoClient: true}*/);
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var RoomSchema = new mongoose.Schema({
  title: {type: String, unique: false, required: true, trim: true },
  floor_id: {type: String, required: true, trim: true },
  sorder: {type: Number, default:99},
  visible: {type: Boolean, default:false},
  activity: {type: Boolean, default:false},
  _prev_title: {type: String,required: false},
  /*floor:{ type: mongoose.Schema.Types.ObjectId, ref: 'floor'}*/
},{ strict: false });

var Room = mongoose.model('Room', RoomSchema,'Room');
module.exports = Room;