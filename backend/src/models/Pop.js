const mongoose = require('mongoose');

const PopSchema = new mongoose.Schema({
  Nome: String
});

module.exports = mongoose.model('Pop', PopSchema);
