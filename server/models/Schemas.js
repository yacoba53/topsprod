const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  id: {type: mongoose.Schema.Types.ObjectId, required: true, unique: true, auto: true},
  name: {type: String, required: true, unique: true, default: null},
  active_score: {type: Number},
  anti_sobriety_score: {type: Number},
  hunger_satisfaction_score: {type: Number},
  thirst_satisfaction_score: {type: Number},
  min_temp: {type: Number},
  max_temp: {type: Number},
  weather: {type: String},
  popularity: {type: Number},
  creation_timestamp: {type: Date, default: Date.now},
});

const VendorSchema = new mongoose.Schema({
  id: {type: mongoose.Schema.Types.ObjectId, required: true, auto: true},
  name: {type: String, required: true, unique: true, default: null},
  latitude: {type: Number},
  longitude: {type: Number},
  hunger_satisfaction_score: {type: Number},
  thirst_satisfaction_score: {type: Number},
  anti_sobriety_score: {type: Number},
  entertainment_score: {type: Number},
  cuisine: {type: Number},
  creation_timestamp: {type: Date, default: Date.now},
});

module.exports = {
  'vendors': mongoose.model('vendors', VendorSchema),
  'activities': mongoose.model('activities', ActivitySchema)
};

