const express = require('express');

const routes = express.Router();

const PopController = require('./controllers/PopController');
const EnlaceController = require('./controllers/EnlaceController')

const swaggerUi = require('swagger-ui-express'), swaggerDocument = require('./swagger.json');



routes.get('/api/pops', PopController.index);
routes.post('/api/pops', PopController.store);
routes.get('/api/enlaces', EnlaceController.index);
routes.post('/api/enlaces', EnlaceController.store);
routes.post('/api/distance', EnlaceController.dijkstra);
routes.use('/api/docs', swaggerUi.serve);
routes.get('/api/docs',swaggerUi.setup(swaggerDocument));



module.exports = routes;
