const { Router } = require('express');

const routes = Router();
const DevController = require('./controllers/DevControllers')
const SearchController = require('./controllers/SearchController')

routes.get('/devs', DevController.index);
routes.get('/devs/:github_username', DevController.show);
routes.delete('/devs/:github_username', DevController.destroy)
routes.post('/devs', DevController.store);


routes.get('/search', SearchController.index)
module.exports = routes;