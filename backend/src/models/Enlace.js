const mongoose = require('mongoose');

const EnlaceSchema = new mongoose.Schema({
  P1: String,
  P2: String,
  metricas: {
    Hops: Number,
    Distancia: Number,
    Custo: Number
  }
});

module.exports = mongoose.model('Enlace', EnlaceSchema);
