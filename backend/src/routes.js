const express = require('express');

const routes = express.Router();

const PopController = require('./controllers/PopController');
const EnlaceController = require('./controllers/EnlaceController')


routes.get('/api/pops', PopController.index);
routes.post('/api/pops', PopController.store);
routes.get('/api/enlaces', EnlaceController.index);
routes.post('/api/enlaces', EnlaceController.store);
routes.get('/api/neighboors/:Nome', EnlaceController.neighboors);


module.exports = routes;
