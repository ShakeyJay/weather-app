const yargs = require('yargs');
const axios = require('axios');
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var address = encodeURIComponent(argv.address);
var geoCodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address;

axios.get(geoCodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address');
  }
  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/5dec274df1c1f05607a1d8559e7ef577/${lat},${lng}`
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  var temp = response.data.currently.temperature;
  var atemp = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temp}. It feels like ${atemp}.`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect');
  } else {
    console.log(e.message);
  }
});


// 5dec274df1c1f05607a1d8559e7ef577
