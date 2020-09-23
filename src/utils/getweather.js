/*jshint esversion: 6 */

const request = require('request');

const getWeather = (address, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=c0092e61c174f50f297174df98e4c0fc&query=' + encodeURI(address);

  request({ url, json: true }, (error, { body } = {}) => {

    if (error) {
      callback('Unable to connect to weather service', undefined);
    }

    else if (body.error) {
      callback('Invalid location', undefined);
    }

    else {
      callback(undefined, {
        currentTemp: body.current.temperature,
        chanceOfRain: body.current.precip,
        location: body.request.query
      });
    }

  });
};

module.exports = getWeather;
