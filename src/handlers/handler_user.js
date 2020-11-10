module.exports = (userModel) => {
	return {
		create:function(props){
			return new Promise((resolve, reject) => {
				const user = new userModel(props);

				user.save((err, doc) => {
					if (err) {
						return reject(err);
					}
					return resolve(doc);
				});
			});
		},

		drop:function(id){
			return new Promise((resolve, reject) => {
				userModel.deleteOne({_id:id},function(err,result){
					if (err) {
						return reject(err);
					}
					return resolve(result);
				})

			})
		},
		get:function(props){
		 	return new Promise((resolve, reject) => {
		 		userModel.find(props,function (err, docs) {
		 			if (err){
		 				return reject (err);
		 			}
		 			return resolve(docs);
		 		});
		 	});
		},
		
		update:function(props){
			return new Promise((resolve, reject) => {
		 		
				let clonedObj={};
				for (let key in props){	
					if (Object.prototype.hasOwnProperty.call(userModel.schema.obj,key)) {
						clonedObj[key]=props[key];
					}
				}
				clonedObj['modificationDate']=Date.now();
				
		 		userModel.updateOne({_id:props._id},clonedObj,function(err, doc){
		 			if (err){
		 				return reject (err);
		 			}
		 			return resolve(doc);
		 		});
			});
		}
	}
}