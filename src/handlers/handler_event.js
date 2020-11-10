
module.exports = (eventModel) => {
	return {
		create:function(props){
			//console.log(props);
			return new Promise((resolve, reject) => {
				const event = new eventModel(props);

				event.save((err, doc) => {
					if (err) {
						return reject(err);
					}
					return resolve(doc);
				});
			});
		},

		drop:function(id){
			return new Promise((resolve, reject) => {
				eventModel.deleteOne({_id:id},function(err){
					if (err) {
						return reject(err);
					}
					return resolve();
				})

			})
		},
		get:function(props){
		 	return new Promise((resolve, reject) => {
		 		eventModel.find(props,function (err, docs) {
		 			if (err){
		 				return reject (err);
		 			}
		 			return resolve(docs);
		 		});
		 	});
		}
	}
}