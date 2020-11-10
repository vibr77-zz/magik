
module.exports = (deviceModel) => {
	return {
	
		dropOne:function(props){
			return new Promise((resolve, reject) => {
				deviceModel.deleteOne(props,function(err){
					if (err) {
						return reject(err);
					}
					return resolve();
				})

			})
		},
		getOne:function(props){
		 	return new Promise((resolve, reject) => {

		 		deviceModel.findOne(props,function (err, doc) {	
		 			if (err){
		 				return reject (err);
		 			}

		 			//console.log(doc);
		 			return resolve(doc);
		 		});
		 	});
		},

		save:function(props){
			return new Promise((resolve, reject) => {
		 		
				props['modificationDate']=Date.now();
				
		 		deviceModel.updateOne({pluginName:props.pluginName},props,{upsert:true},function(err, doc){
		 			if (err){
		 				return reject (err);
		 			}
		 			return resolve(doc);
		 		});
			});
		}
	}
}