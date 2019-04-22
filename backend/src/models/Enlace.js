const mongoose = require('mongoose');

const EnlaceSchema = new mongoose.Schema({
  P1: String,
  routes:
    [
      { name: String, metricas: { distance: Number, cost: Number } }
    ]
});

module.exports = mongoose.model('Enlace', EnlaceSchema);
