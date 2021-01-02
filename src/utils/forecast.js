const request = require('postman-request');

const forecast = (longitude, latitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=0c27aad265bf80dfc3e14c44f1c4be85&query=' + latitude + ',' + longitude;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to weather services!');
    } else if (body.error) {
      callback('Unable to find location');
    } else {
      const current = body.current;
      callback(
        undefined,
        `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out.`
      );
    }
  })
}

module.exports = forecast;