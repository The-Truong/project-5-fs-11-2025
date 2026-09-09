const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  { 
    name: String,
  }
);

// biến sẽ đại diện cho model
const City = mongoose.model('City', schema, 'cities');

module.exports = City;