const axios = require("axios")
require("dotenv").config();
const mapBoxKey = process.env.MAP_BOX_KEY

async function getCoordinates(city) {
    try {
        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=${mapBoxKey}`)
        return response.data.features[0].center
    } catch (err) {
        console.log('*--- getCoordinates.err:', err)
        return null
    }
}

module.exports = getCoordinates