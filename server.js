const express = require('express')
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
// const argv = require('yargs').argv;

let apiKey = 'a46bcdf8288b670b4711ff710eb20a92';





app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', function (req, res) {
  res.render('index');
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  request(url, function (err, response, body) {
    if (err) {
      res.render('index', { weather: null, error: 'Error, please try again' });
    } else {
      let weather = JSON.parse(body);
      if (weather.main == undefined) {
        res.render('index', { weather: null, error: 'Error, please try again' });
      }
      else {
        let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', { weather: message, error: null });
      }
    }
  });

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
