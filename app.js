require("@babel/register")({
  presets: ["@babel/preset-env"]
});


// This a test a Second Test
// All in all test

//const {Worker, isMainThread, parentPort, workerData} = require('worker_threads');

const axon = require('pm2-axon');
const log =require( './logger');
var cluster=require('cluster');

const config =require( './config');
const db=require('./src/models/db')(log,config.db.url)

if (cluster.isMaster) {
	//const numCPUs = require("os").cpus().length;
	
	log.info(' ');
	log.info("🚀 mainThread: launched on the Earth")
	
	const sockAdmin= axon.socket('pub');
	sockAdmin.bind(config.app.sockAdmin);

	sockAdmin.on('connect',function(){
		log.info("🚀 mainThread: worker connected to pub queue:"+config.app.sockAdmin);
	})

	//
	// Worker Management
	//

	var i = 0;
  let numCPUs=4;
  while (i < numCPUs) {
  	let env = {workerId: i};
    let newWorker = cluster.fork(env);
    newWorker.process.env = env;
    i++;
  }

 	cluster.on("exit", function(worker, code, signal) {

    let worker_id=worker.process.env.workerId;
    var env = {workerId: worker_id};

    if (config.app.autoWorkerRestart==true && code!=0){
    	var rebornWorker = cluster.fork(env);
    	rebornWorker.process.env = env;
    	log.error("🌱 workerThread:"+worker_id+" Worker is dead, long life to new worker, autoWorkerRestart:true")
  	}
  });

	//
	// Express interface
	//

	const xprs=require('express')();
	xprs.get('/api/admin/worker/:id/end', function(req, res){
		let id=parseInt(req.params.id,10);
  	res.send({method:'endWorker',id:id,status:'OK'});
  	sockAdmin.send({method:'endWorker',workerId:id});
	});

	xprs.get('/api/admin/worker/:id/start', function(req, res){
		let id=parseInt(req.params.id,10);
  	res.send({method:'startWorker',id:id,status:'OK'});
  	
  	var env = {workerId: id};

    if (config.app.autoWorkerRestart==true){
    	var rebornWorker = cluster.fork(env);
    	rebornWorker.process.env = env;
  	}
	});

	xprs.listen(config.app.webAdminPort);

}else{

	// 
	// For all module
	//

	let clust_id=cluster.worker.process.env.workerId;
	const eventModel= require('./src/models/model_event')(db);
	const eventHandler=require('./src/handlers/handler_event')(eventModel);

	const sockAdmin= axon.socket('sub');
	sockAdmin.connect(config.app.sockAdmin);

	sockAdmin.on('message',function(msg){
		if (msg && msg['method']=='endWorker' && msg['workerId']==clust_id){
			log.warn("💣 worker Admin Command:"+msg['method']+ ' id:'+msg['workerId']);
			log.warn("...");
			if (true) // without it exit without logging before
				process.exit(0);
		}
	});

	if (parseInt(cluster.worker.process.env.workerId)==0){
	
		log.info('');
		log.info("🚀 workerThread:"+clust_id+" launched on the Moon")
		log.info("🌱 workerThread:"+clust_id+" deviceController")
	 	
		const deviceModel= require('./src/models/model_device')(db);
		const deviceHandler=require('./src/handlers/handler_device')(deviceModel);
		
		const DeviceController=require('./src/device');
		const deviceController=new DeviceController(config,eventHandler,deviceHandler);
	}

	if (parseInt(cluster.worker.process.env.workerId)==1){

		log.info('');
		log.info("🚀 workerThread:"+clust_id+" launched on the Moon")
		log.info("🌱 workerThread:"+clust_id+" spellController")

		const spellModel=require('./src/models/model_spell')(db);
		const spellHandler=require('./src/handlers/handler_spell')(spellModel);
		
		const SpellController=require('./src/spell');
		const spellController=new SpellController(config,spellHandler,eventHandler);

		// setTimeout(function(){
		//  	const sockLssReq=axon.socket('req');
		//  	sockLssReq.connect(config.app.sockLssReq);
		//  	let cmd={method:'getDevice',pluginName:'deviceZwave','_id':'0xfd730e5e-14'}
		//  	sockLssReq.send(cmd,function(err,result){
		//  		console.log("bfore null:")
		//  		console.log(result);
		//  	});
		// }, 10*1000);
	}

	if (parseInt(cluster.worker.process.env.workerId)==2){
		log.info('');
		log.info("🚀 workerThread:"+clust_id+" launched on the Moon")
		log.info("🌱 workerThread:"+clust_id+" apiController")

		const ApiController=require('./src/api');
		const apiController=new ApiController(config);
	}
}
