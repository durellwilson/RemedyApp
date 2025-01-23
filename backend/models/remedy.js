const mongoose = require('mongoose');

const remedySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ailment: {
    type: String,
    required: true
  },
  ingredients: [{
    type: String,
    required: true
  }],
  instructions: {
    type: String,
    required: true
  },
  effectiveness_rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  budget_rating: {
    type: String,
    enum: ['$', '$$', '$$$'],
    default: '$'
  },
  source: {
    type: String
  },
  image: {
    url: String,
    alt: String,
    contentType: String
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Remedy', remedySchema);
