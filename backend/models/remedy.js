const mongoose = require('mongoose');

const remedySchema = new mongoose.Schema({
  name: { type: String, required: true },
  ailment: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  effectiveness_rating: { type: Number, required: true },
  budget_rating: { type: String, required: true },
  source: { type: String },
  image: {
    url: { type: String },
    alt: { type: String }
  },
  created_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Remedy', remedySchema);
