const request = require('request');


var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/5dec274df1c1f05607a1d8559e7ef577/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200){
      callback(undefined, {
        temp: body.currently.temperature,
        appTemp: body.currently.apparentTemperature
      });
    } else {
    callback('Unable to connect');
    }
  });
};

module.exports.getWeather = getWeather;
