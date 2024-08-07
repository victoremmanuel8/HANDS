const mongoose = require('mongoose');

const ThemeSchema = new mongoose.Schema({
  profId: {
    type: String,
    required: true,
    unique: true
  },
  theme_pref: {
    type: String,
    enum: ['light', 'dark', 'blue', 'full-dark', 'pink'],
    default: 'light'
  }
});

module.exports = mongoose.model('Theme_prof', ThemeSchema);
