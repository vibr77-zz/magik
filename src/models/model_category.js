const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    categoryName: {
    	type: String,
      unique: true,
    	required: true
    },
    data: {
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
	return connection.model('Category', categorySchema);
};