var Cache = require('./cache');
var geocoderProvider = 'google';
var httpAdapter = 'http';
var extra = {};

// optional
// var extra = {
//     apiKey: 'YOUR_API_KEY', // for Mapquest, OpenCage, Google Premier
//     formatter: null         // 'gpx', 'string', ...
// };

var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra);

exports.geocode = function(address, done) {


	Cache.get('geocoder', address, function(data) {

		if (data) {
			console.log("using cache", data)
			return sendResult(data[0], done)
		}

		geocoder.geocode(address + ', United States', function(err, res) {

			if (err || !res.length) {
				console.log('error with geoCoder or no results', err, res)
			}

			console.log('response', res)

			Cache.save('geocoder', address, res, function() {
				sendResult(res[0], done)
			})			
			
		});	

	});	

}

sendResult = function(geoObject, done) {
	console.log(geoObject)
	return done([geoObject.latitude, geoObject.longitude])
}