const Ajv=require('ajv');
const check = require('check-types');
const axon = require('pm2-axon');

const log =require( '../../../logger');
const clone =require( 'clone');


// Need a betterWay to Manage this



const TAG='apiCategory';

class apiCategory{
	static tag=TAG;
	constructor(config,xprs) {
		this.tag=TAG;
		this.xprs=xprs;
		this.config=config;

		const db=require('../../models/db')(log,config.db.url)
		const categoryModel= require('../../models/model_category')(db);
		const categoryHandler=require('../../handlers/handler_category')(categoryModel);
		
		this.categoryHandler=categoryHandler;

		this.command();

	}
	command(){
		//getCategory based on Categoryname
		this.xprs.get('/api/category/:categoryName', function(req, res){
			let categoryName=req.params.categoryName;
			//console.log(categoryName)
			this.categoryHandler.getOne({categoryName:categoryName})
				.then(function(result){
					return res.status(201).send(result);
				}.bind(this))
				.catch(function(err){
					console.log(err);
					return res.status(400).send({
      			success: 'false',
      			message: err,
    			}.bind(this));
				}.bind(this));
		}.bind(this));

		this.xprs.put('/api/category/:categoryName', function(req, res){
			let categoryName=req.params.categoryName;
			//console.log(categoryName)

			this.categoryHandler.save(req.body)
				.then(function(result){
					return res.status(201).send(result);
				}.bind(this))
				.catch(function(err){
					console.log(err);
					return res.status(400).send({
      			success: 'false',
      			message: err,
    			}.bind(this));
				}.bind(this));
		}.bind(this));
	}
}

module.exports = apiCategory;