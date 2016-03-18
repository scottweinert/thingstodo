var graph = require('fbgraph');

graph.setAccessToken('CAACEdEose0cBALZCVV5chalK8ZCZB4vnday3BGWWBeNZBd8kyPrYUzqdw8eOAxc4L6ecm9Ocp3sy3hBDEEoZCkpRL1CzsB9ZAAYGdKFZCnHrYze4Hf5xCcPobpP1ClPwDwGGGIP35Ot6fWT4mVfNi2uW642kjxZCD8HxATeKVpobL64WFLssTQ6bKbCm3UM6Dux6myOHbErjFwZDZD');

exports.getPageEvents = function(pageId, done) {

	graph.get(pageId + '/events?fields=description,start_time,end_time,attending_count,category,interested_count,maybe_count,name,id,ticket_uri,timezone,updated_time,admins,cover,comments&since=now', function(err, res) {
		done(err, res)
	});	
	
}