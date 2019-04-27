const mongoose = require('mongoose');

const PopSchema = new mongoose.Schema({
  Nome: String,
  LatLong: {
    lat: Number,
    long: Number
  }

});

module.exports = mongoose.model('Pop', PopSchema);
