// User Model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CacheSchema = new Schema({

  provider: String

  , route: String
  
  , query: String

  , data: {}

  , created: { type: Date, default: Date.now }

  , updated: { type: Date, default: Date.now }  

});


module.exports = mongoose.model('Cache', CacheSchema);