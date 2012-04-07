var DATA = {}

var _ = require('underscore')

var sum = function(iter){
  return _.reduce(iter, function(memo, num){ return memo + num; }, 0);
}  

exports.rate = function(user, test, rating){
  DATA[user + '-' + test] = DATA[user + '-' + test] || [];
  DATA[user + '-' + test].push(rating)
}


//exports.pval = function(

/*
Get Confidence
*/
exports.confidence = function(user, test){

}


/*
*/
exports.success = function(user, test){
  var ratings = DATA[user + '-' + test]
  
  var mean = sum(ratings)/ratings.length
  
  return mean
}



exports.rate('bob', 'test1', 0.1);
exports.rate('bob', 'test1', 0.3);
exports.rate('bob', 'test1', 0.2);
exports.rate('bob', 'test1', 0.2);
exports.rate('bob', 'test1', 0.35);
exports.rate('bob', 'test1', 0.36);


console.log("Success", exports.success('bob', 'test1'))
console.log("Confidence", exports.confidence('bob', 'test1'))
