const express = require('express');
const cors = require('cors');

const weatherJs = require('weather-js');
const app = express();
app.use(cors());


const request = require('request');  
var apiKey = 'ffc4fb6a67f4b1d28d7d6761ae6089c1';
var units = 'metric'

app.get('/', function (req, res) {
    if(req.query.location) {
      const location = req.query.location;

      let url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&appid=${apiKey}` 
      let temp;
        
      request(url, function (err, response, body) {
          if(err){
            console.log('error:', error);
          } else {
            let weather = JSON.parse(response.body);
            const temp = weather.main.temp;
              
              res.send(temp.toString());
          //   console.log(temp)
          }
        });
    
    }
    else {
      const lat = req.query.lat;
      const long = req.query.long;
      let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${units}&appid=${apiKey}` 
      let temp;
        
      request(url, function (err, response, body) {
          if(err){
            console.log('error:', error);
          } else {
            let weather = JSON.parse(response.body);
            const temp = {
              location: weather.name,
              temperature: weather.main.temp
            };
              res.send(temp);
          //   console.log(temp)
          }
        });
    
    }
})

app.listen(8080,()=> {
    console.log("Server is running")
})