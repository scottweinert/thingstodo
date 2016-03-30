var async = require('async');
var Factual = require('./factual');
var Facebook = require('./facebook');
var EventModel = require('../models/event-model');

exports.getByLocation = function(location, done) {

	// @TODO Even cache queries to local DB for super fast results, can expire

	Factual.getPlacesNear(location, function(err, places) {

		// Loop through places and get events
		async.eachSeries(places, function(place, next) {
			
			Facebook.getPageEvents(place.facebookId, function(err, events) {

				if (err) {
					console.log("There was an error with Facebook.getPageEvents:", err)
				}
				
				console.log(events)
				next();

			})

				
		}, function(err){
			done()
		});
	})

}