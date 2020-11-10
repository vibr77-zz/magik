
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    domain: {
    	type: String,
    	required: true
    },
    eventType:{
    	type: String,
    	required: false
   	},
    data: {
    	type: Object,
    	required: true,
    },
  	creationDate:{
  		type: Date,
  		default: Date.now()
  	},
  }
);

module.exports = (connection) => {
	return connection.model('Event', EventSchema);
};