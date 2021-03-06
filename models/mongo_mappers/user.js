const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  username: { type: String, unique: true },
  password: String,
  role: String,
}, {
  timestamps: true,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
