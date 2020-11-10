


var mongoObjectId=()=> {
  var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
  return (Math.random() * 16 | 0).toString(16);
  }).toLowerCase();
}

var checkReplaceId=(id)=>{
	const idRegex = RegExp('^[a-f\\d]{24}$', 'g');
    if (id){
      if (idRegex.test(id)===false)
        return mongoObjectId();
    }
  return id;
}

module.exports = {
    mongoObjectId: mongoObjectId,
    checkReplaceId: checkReplaceId,
};
