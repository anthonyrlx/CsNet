const mongoose = require('mongoose');

const PopSchema = new mongoose.Schema({
  Nome: String,
  Fechado: {
    type: Boolean,
    default: false,
  },

});

module.exports = mongoose.model('Pop', PopSchema);
