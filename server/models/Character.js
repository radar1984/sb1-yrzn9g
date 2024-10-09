const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  description: {
    type: String,
    required: true
  },
  skinColor: {
    type: String,
    required: true
  },
  hairstyle: {
    type: String,
    required: true
  },
  outfit: {
    type: String,
    required: true
  },
  personalityTraits: {
    type: String,
    required: true
  },
  referenceImage: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('character', CharacterSchema);