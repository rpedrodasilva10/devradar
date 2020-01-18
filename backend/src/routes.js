const { Router } = require('express');

const routes = Router();
const DevController = require('./controllers/DevControllers')
const SearchController = require('./controllers/SearchController')

routes.get('/devs', DevController.index);
routes.get('/devs/dev', DevController.show);
routes.post('/devs', DevController.store);


routes.get('/search', SearchController.index)
module.exports = routes;