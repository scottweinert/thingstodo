var async = require('async');
var FactualApi = require('factual-api');

var Categories = require('./factual-categories');
var Cache = require('./cache');
var Geocoder = require('./geocoder');

// Configure Factual
var factual = new FactualApi('KLjCb0jloUA4TM7354c70cnvM9FPWUw8I3p0QPfo', 'l6MRQlHdrqLpTaVG9L0YP0ata2Jyn7C8I7fs1qIn');
factual.startDebug();
var enabledCategories = Categories.getEnabledCategories()
var distance = 5000;

console.log('Enabled Categories', enabledCategories)

exports.getPlacesNear = function(location, done) {

	// Geocode location
	Geocoder.geocode(location, function(coordinates) {

		if (!coordinates) {
			console.log("Geocoder Failed", location)
			return
		}
		console.log(coordinates)

		var query = '/t/places-us' + coordinates + distance + enabledCategories;
		console.log('query', query)

		Cache.get('factual', query, function(res) {

			// Use cache if available
			if (res) {
				return parsePlaces(res.data, done)
			}	

			// Get places
			factual.get('/t/places-us', {geo:{"$circle":{"$center":coordinates,"$meters":distance}}, 
				filters:{category_ids:{"$includes_any":enabledCategories}}}, function (error, res) {

				if (error) {
					console.log('Factual getPlacesNear error', error)
					return
				}

				Cache.save('factual', query, res, function() {
					parsePlaces(res.data, done)
				})

			})

		})		

	})


};

parsePlaces = function(places, callback) {

	var placesToReturn = [];

	async.eachSeries(places, function(place, next) {
		console.log(place)
		getFacebookId(place.factual_id, function(err, facebookId) {
			if (facebookId) {
				place.facebookId = facebookId;
				placesToReturn.push(place);
			}
			next();
		})
	}, function(err) {
		callback(null, placesToReturn)
	});	

}

getFacebookId = function(factualId, gotIt) {

	var query = '/t/crosswalk?filters={"factual_id":"' + factualId + '","namespace":"facebook"}'

	async.waterfall([

		// Check if data is Cached
	    function(done) {

			Cache.get('factual', query, function(data) {
				return done(null, data)
			})	    

	    },

	    // Do query if it wasn't cached
	    function(data, done) {

	    	if (data) {
	    		return done(null, data)
	    	}

			factual.get(query, function (err, data) {

				if (err) {
					console.log('Factual getFacebookId error', err)
					return done(err)
				}

				Cache.save('factual', query, data, function() {
					done(err, data)
				})				

			});	    	
	    }

	    // Format result and send it back ftw
	], function (err, data) {
		var object = data.data
		if (object && object.length && object[0].url) {
			var facebookUrlParts = object[0].url.split(".com/");
			gotIt(null, facebookUrlParts[1]); 
		} else {
			console.log('null FB ID', factualId)
			gotIt('No Facebook ID for factual ID', null)
		}	    
	});	

}