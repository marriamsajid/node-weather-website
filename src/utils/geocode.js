const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFycnIiLCJhIjoiY2s1NnJnbXhyMDZqMDNscGc0MTJ2MW1wcSJ9._Ij8oScYDC4VoTMhQX28Dw&limit=1'
    request( { url, json: true }, (error, {body}) => {
        if (error) {
            callback('Network connection error', undefined)
        }  else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
            
         }
    })
}

module.exports = geocode
