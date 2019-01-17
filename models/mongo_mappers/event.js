const mongoose = require('mongoose');

const { Schema } = mongoose;

const EventSchema = new Schema({
  name: String,
  type: String,
  place: String,
  npc: String,
  time: String,
  day: String,
  sound: String,
}, {
  timestamps: true,
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
