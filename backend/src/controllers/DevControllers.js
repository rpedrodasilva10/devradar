
const axios = require('axios');
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {

    async show(request, response){
        const {github_username} = request.params
        const dev = await Dev.findOne({github_username: github_username});
        
        if(dev){
            return response.json(dev);
        };
    },
    async destroy(request, response){
        const {github_username} = request.params;
         
        const api_return = await Dev.deleteOne({github_username});
        
        const { n } = api_return;
        if (n === 1) {
            return response.status(200).json({'message': 'Resource DELETED' });
        }
        else {
            return response.status(404).json({'message': 'Resource not found' });
        }
    },
   
    async index(request, response) {
        devs = await Dev.find();
        return response.json(devs);
        
    },
    async store(request, response){
        const { github_username, techs, longitude, latitude } = request.body

        let dev = await Dev.findOne({github_username});

        if (!dev) {
            const api_response = await axios.get(`https://api.github.com/users/${github_username}`)

            const { name = login, avatar_url, bio } = api_response.data

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }
        return response.json(dev);
    }

  
};
