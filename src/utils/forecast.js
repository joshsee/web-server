const apiKey = require('../appConfig.js')
const request = require('postman-request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key='+ apiKey.weatherStackToken +'&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longtitude)

    request({url, json: true}, function (error, {body}) {
        if (error){
            callback('Unable to connect to weather services!', undefined)
        } else if(body.error){
            callback('Unable to find location. Try another search', undefined)
        } else {
            // console.log(response.body.location.name)
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently "+ body.current.temperature +" degrees out. It feels like "+ body.current.feelslike + " degrees out")
        }
    })
}

module.exports = forecast