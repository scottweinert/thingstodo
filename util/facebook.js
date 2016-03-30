var graph = require('fbgraph');
var Cache = require('./cache');

graph.setAccessToken('CAACEdEose0cBAJ9BeeXXTpCsBYIfIIhZClL46f8D3XkZCISaPYeAdBm1iS3AUZBnmYfJ6XCav7ZCZCZBBdpwAH0JTLIy1fjBmOFDV9ZCIqjWBD0ZBDEzIN3Nt1iKwKDBCeQEPl9ZC77FYdgFFEXnAighacCG8BckrS6NlF9EG0wSyEBAiTPVd3W80nOlpkqjIgyIb8uVH9iCOLAZDZD');

exports.getPageEvents = function(pageId, done) {

	if (!pageId) {
		return done('Facebook Page ID is required')
	}

	var query = pageId + '/events?fields=description,start_time,end_time,attending_count,category,interested_count,maybe_count,name,id,ticket_uri,timezone,updated_time,admins,cover,comments&since=now&limit=5000'

	Cache.get('facebook', query, function(data) {

		if (data) {
			return done(null, data)
		}

		graph.get(query, function(err, response) {

			if (err) {
				return done(err)
			}

			Cache.save('facebook', query, response, function() {
				done(err, response)
			})

		});		

	})

}