module.exports = (categoryModel) => {
	return {
		dropOne:function(props){
			return new Promise((resolve, reject) => {
				categoryModel.deleteOne(props,function(err){
					if (err) {
						return reject(err);
					}
					return resolve();
				})

			})
		},
		getOne:function(props){
		 	return new Promise((resolve, reject) => {
		 		categoryModel.findOne(props,function (err, doc) {	

		 			if (err){
		 				return reject (err);
		 			}
		 			return resolve(doc);
		 		});
		 	});
		},
		save:function(props){
			return new Promise((resolve, reject) => {
		 		
				props['modificationDate']=Date.now();
		 		categoryModel.updateOne({categoryName:props.categoryName},props,{upsert:false},function(err, doc){
		 			if (err){
		 				return reject (err);
		 			}
		 			return resolve(doc);
		 		});
			});
		}
	}
}