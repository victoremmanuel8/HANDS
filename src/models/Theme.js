const mongoose = require('mongoose');

const ThemeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  theme_pref: {
    type: String,
    enum: ['light', 'dark'],
    default: 'light'
  }
});

module.exports = mongoose.model('Theme', ThemeSchema);
