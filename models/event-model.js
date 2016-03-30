// User Model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({

  name: String

  , description: String

  , start: Date

  , end: Date

  , interested: Number

  , meta: {
    id: { type: String, index: true }
    , source: {type: String, index: true }
    , url: String
    , category: String
    , coverImageUrl: String
  }

  , created: { type: Date, default: Date.now }

  , updated: { type: Date, default: Date.now }    

});


module.exports = mongoose.model('Event', EventSchema);