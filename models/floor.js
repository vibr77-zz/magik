var mongoose = require('mongoose');
var logger = require("../logger");
const config=require("../config");

const { db: { host, port, name } } = config;
const connectionString = `mongodb://${host}:${port}/${name}`;

mongoose.connect(connectionString,  { useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true }/*{useMongoClient: true}*/);
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var FloorSchema = new mongoose.Schema({
  title: {type: String, unique: true, required: true, trim: true },
  sorder: {type: String, required: true, trim: true }
},{ strict: false });

var Floor = mongoose.model('Floor', FloorSchema,'Floor');
module.exports = Floor;