var FactualApi = require('factual-api');
var factual = new FactualApi('KLjCb0jloUA4TM7354c70cnvM9FPWUw8I3p0QPfo', 'l6MRQlHdrqLpTaVG9L0YP0ata2Jyn7C8I7fs1qIn');
var Categories = require('./factual-categories');
factual.startDebug();

var enabledCategories = Categories.getEnabledCategories()
console.log(enabledCategories)

exports.getPlacesNear = function(location, done) {
	factual.get('/t/places-us', {geo:{"$circle":{"$center":[30.633263, -97.677986],"$meters":5000}}, 
		filters:{category_ids:{"$includes_any":enabledCategories}}}, function (error, res) {

		if (error) {
			console.log(error)
		}

	  	done(res.data)

	});
}

exports.getFacebookUrl = function(factualId, done) {

	factual.get('/t/crosswalk?filters={"factual_id":"' + factualId + '","namespace":"facebook"}',
		function (error, res) {

		if (error) {
			console.log(error)
		}
		console.log(res.data[0].url)

		if (res.data.length && res.data[0].url) {
			done(res.data[0].url); 
		} else {
			done(null)
		}

	});	

}