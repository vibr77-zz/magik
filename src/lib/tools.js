

function mongoObjectId() {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};

function addItemToArray(arr,newItem,maxItem){
	if (newItem==null)
		return arr;

	console.log(arr.length);
	if (arr.length>=maxItem)
		arr.pop();

 	arr.unshift(newItem);
	return arr;
}

module.exports={
	mongoObjectId,
	addItemToArray
}