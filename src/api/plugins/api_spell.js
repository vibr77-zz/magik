const Ajv=require('ajv');
const check = require('check-types');
const axon = require('pm2-axon');

const log =require( '../../../logger');
const clone =require( 'clone');

const TAG='apiSpell';

class apiSpell{
	static tag=TAG;
	constructor(config,xprs) {
		this.tag=TAG;
		this.xprs=xprs;
		this.config=config;

		const sockSpellCommand=axon.socket('req');
		sockSpellCommand.connect(this.config.app.sockSpellCommand);
		this.sockCommand=sockSpellCommand;

		this.command();

	}
	command(){

		//getspell
		this.xprs.get('/api/spell', function(req, res){
			
			let cmd={method:'getSpells'};
			
			this.sockCommand.send(cmd,function(err,result){
				if (result)
					return res.status(201).send(result);
				else{
					return res.status(400).send({
      			success: 'false',
      			message: err,
    			});
				}
			});
		}.bind(this));

		this.xprs.get('/api/spell/:id', function(req, res){
			let id=req.params.id;
			let cmd={method:'getSpell',_id:id};
			
			this.sockCommand.send(cmd,function(err,result){
				if (result)
					return res.status(201).send(result);
				else{
					return res.status(400).send({
      			success: 'false',
      			message: err.msg,
    			});
				}
			});
		}.bind(this));

		this.xprs.get('/api/spell/:id/execute', function(req, res){
			let id=req.params.id;
			let cmd={method:'executeSpell',_id:id};
			
			this.sockCommand.send(cmd,function(err,result){
				if (result)
					return res.status(201).send(result);
				else{
					return res.status(400).send({
      			success: 'false',
      			message: err.msg,
    			});
				}
			});
		}.bind(this));


		this.xprs.put('/api/spell/:id', function(req, res){
			let id=req.params.id;
			let cmd={method:'setSpell',_id:id,props:req.body.props,spellEntries:req.body.spellEntries};
			console.log(cmd);
			this.sockCommand.send(cmd,function(err,result){
				if (result)
					return res.status(201).send(result);
				else{
					return res.status(err.code).send({
      			success: 'false',
      			message: err.msg,
    			});
				}
			});
		}.bind(this));

		this.xprs.delete('/api/spell/:id', function(req, res){
			let id=req.params.id;
			let cmd={method:'deleteSpell',_id:id};
			console.log(id);
			this.sockCommand.send(cmd,function(err,result){
				if (result)
					return res.status(201).send(result);
				else{
					console.log(err);
					return res.status(err.code).send({
      			success: 'false',
      			message: err.msg,
    			});
				}
			});
		}.bind(this));

		this.xprs.get('/api/spell/:id/spellentry/:entryid', function(req, res){
			let id=req.params.id;
			let entryid=req.params.entryid
			let cmd={method:'getSpellEntry',_id:id,entryId:entryid};
			
			this.sockCommand.send(cmd,function(err,result){
				if (result)
					return res.status(201).send(result);
				else{
					return res.status(err.code).send({
      			success: 'false',
      			message: err.msg,
    			});
				}
			});
		}.bind(this));

		this.xprs.put('/api/spell/:id/spellentry/:entryid', function(req, res){
			let id=req.params.id;
			let entryid=req.params.entryid

			let cmd={method:'setSpellEntry',_id:id,entryId:entryid,props:req.body.props};
			
			this.sockCommand.send(cmd,function(err,result){
				if (result)
					return res.status(201).send(result);
				else{
					return res.status(err.code).send({
      			success: 'false',
      			message: err.msg,
    			});
				}
			});
		}.bind(this));

		this.xprs.post('/api/spell',function(req,res){
			
			let cmd={method:'createSpell',spell:req.body};
			
			this.sockCommand.send(cmd,function(err,result){
				if (result)
					return res.status(201).send(result);
				else{
					return res.status(err.code).send({
      			success: 'false',
      			message: err.msg,
    			});
				}
			});
		}.bind(this));

		this.xprs.post('/api/spell/:id/spellentry/:entryid', function(req, res){
			let id=req.params.id;
			let entryid=req.params.entryid

			let cmd={method:'addSpellEntry',_id:id,entryId:entryid,newEntry:req.body};
			
			this.sockCommand.send(cmd,function(err,result){
				if (result)
					return res.status(201).send(result);
				else{
					return res.status(err.code).send({
      			success: 'false',
      			message: err.msg,
    			});
				}
			});
		}.bind(this));


		this.xprs.delete('/api/spell/:id/spellentry/:entryid', function(req, res){
			let id=req.params.id;
			let entryid=req.params.entryid
			let cmd={method:'deleteSpellEntry',_id:id,entryId:entryid};
			
			this.sockCommand.send(cmd,function(err,result){
				if (result)
					return res.status(201).send(result);
				else{
					return res.status(err.code).send({
      			success: 'false',
      			message: err.msg,
    			});
				}
			});
		}.bind(this));

	}
}
module.exports = apiSpell;