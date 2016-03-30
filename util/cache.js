var CacheModel = require('../models/cache-model');

exports.save = function(provider, query, data, saved) {

	exports.get(provider, query, function(toUpdate) {
		if (toUpdate) {
			console.log('Updating cache')
			toUpdate.data = data
			toUpdate.save(saved)
		} else {
			var object = {
				provider: provider
				, query: query
				, data: data
			}
			console.log('Creating Cache', provider, query)
			new CacheModel(object).save(saved);
		}
	})


}

exports.get = function(provider, query, done) {
	CacheModel.findOne({provider: provider, query: query}, function(err, data) {
		if (err || !data) {
			return done(null)
		}
		console.log('Returning Cache', provider, query)
		done(data.data)
	})
}