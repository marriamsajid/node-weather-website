const request = require('request')

const forecast = (c1, c2, callback) => {
    const url = 'https://api.darksky.net/forecast/db3e7097668421b2598afcb5edce4a5c/' + c1  + ','+ c2
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Network connection error', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback( undefined, body.daily.data[0].summary + ' It is currently ' +body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast