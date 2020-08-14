var express = require('express');
var router = express.Router();
const getCoordinates = require('../services/getCoordinates')
const getWeather = require('../services/getWeather')


/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({ data: "Hello world" })
});

router.get('/weather', async function (req, res, next) {
    try {
        const { city } = req.query;
        if (!city) {
            return res.status(400).json({ message: "You need to provide city" })
        }
        const place = await getCoordinates(city)
        if (!place) {
            return res.status(400).json({ message: `Can not get coordinate of ${city}` })
        }
        const latitude = place[1]
        const longitude = place[0]
        const weather = await getWeather(latitude, longitude)
        if (!weather) {
            return res.status(400).json({ message: `Can not get weather of ${city}` })
        }
        res.json({ data: weather })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.get('/weather/position', async function (req, res, next) {
    try {
        let { lat, long } = req.query;
        // lat = parseFloat(parseFloat(lat).toFixed(3))
        // long = parseFloat(parseFloat(long).toFixed(3))
        if (!lat) {
            return res.status(400).json({ message: "You need to provide lat" })
        }
        if (!long) {
            return res.status(400).json({ message: "You need to provide long" })
        }
        const weather = await getWeather(lat, long)
        if (!weather) {
            return res.status(400).json({ message: `Can not get weather of position with lat:${lat}, long:${long}` })
        }
        res.json({ data: weather })
    } catch (err) {
        console.log('err:', err)
        res.status(500).json({ message: err.message })
    }
});

module.exports = router;
