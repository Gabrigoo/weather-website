const path = require('path');
const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
 
const app = express();

// Define paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// This tells node to have hbs serve dynamic files from views
app.set('view engine', 'hbs');
// This tells node to look in templates views instead of public views
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// This tells node to serve STATIC files from public
app.use(express.static(publicDir));

// This passes info to hbs
app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Gábor Rigó',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Gábor Rigó',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'About Me',
    name: 'Gábor Rigó',
    message: 'How can I help you?',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!'
    })
  }
  geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    };
    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      };
      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address,
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'About Me',
    name: 'Gábor Rigó',
    error: 'Help article not found.',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'About Me',
    name: 'Gábor Rigó',
    error: 'Page not found.',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});