const axios = require('axios')
require("dotenv").config();

const openWeatherKey = process.env.OPEN_WEATHER_KEY

async function getWeather(latitude, longitude) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherKey}&units=metric`)
        return response.data
    } catch (err) {
        console.log('*--- getWeather.err:', err)
        return null
    }
}

module.exports = getWeather