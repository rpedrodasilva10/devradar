const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')
// index, show, update, destroy, store
module.exports = {
    async index(request, response) {
        const {latitude, longitude, techs} = request.query;
        console.log(techs);
        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                },
                $maxDistance: 10000,
            }
        });
        
        return response.json({devs: [devs]});
    }
};
