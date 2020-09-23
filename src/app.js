/*jshint esversion: 6 */

const express = require('express');
const path = require('path');
const hbs = require('hbs');

const getWeather = require('./utils/getweather');

const app = express();
const port = process.env.PORT || 3000;

const publicdir = path.join(__dirname, '../public');
const partialdir = path.join(__dirname, '../views/partials');

app.set('view engine', 'hbs');

app.use(express.static(publicdir));

hbs.registerPartials(partialdir);

const authorName = 'Me';

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: authorName
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Us',
    name: authorName
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: authorName,
    message: 'Make sure to check out FAQ'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'you must provide an address'
    });
  }

  getWeather(req.query.address, (error, { currentTemp, chanceOfRain, location, stringerror } = {}) => {

    if (error) {
      res.send({
        error: error
      });
    }

    else {
      res.send({
        location: location,
        temperature: currentTemp,
        chanceOfRain: chanceOfRain
      });
    }

  });


});

app.get('*', (req, res) => {
 res.render('404', {
   title: 'Error 404',
   name: authorName,
   message: 'Page not found'
 });
});

app.listen(port, () => {
  console.log('Now listening on ' + port);
});
