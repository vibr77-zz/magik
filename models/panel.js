var mongoose = require('mongoose');
var logger = require("../logger");
const config=require("../config");

const { db: { host, port, name } } = config;
const connectionString = `mongodb://${host}:${port}/${name}`;

mongoose.connect(connectionString, {useMongoClient: true});
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var PanelSchema = new mongoose.Schema({
  value_id: {type: String, unique: true, required: true, trim: true },
 	ValueShowincontrol: {type: String, required: false, trim: true },
  visible:{type: String, required: false, trim: true }

},{strict:false});

var Panel = mongoose.model('Panel', PanelSchema,'Panel');
module.exports = Panel;