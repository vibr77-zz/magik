
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
    pluginName: {
    	type: String,
      unique: true,
    	required: true
    },
    props: {
      status: {
        type: Boolean,
        required: true,
        default: true
      },
    },
    services: {
      type: Array,
      required: true,
    },
    devices: {
    	type: Array,
    	required: true,
    },
  	creationDate:{
  		type: Date,
  		default: Date.now()
  	},
    modificationDate:{
      type: Date,
      default: Date.now()
    },
  }
);

module.exports = (connection) => {
	return connection.model('Device', DeviceSchema);
};