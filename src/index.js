import _ from 'lodash';
import './style.css';
function component() {
    const element = document.createElement('div');
  
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    
    const searchbox = document.querySelector('.search-box');
    searchbox.addEventListener('keypress', enterQuery);
    
    function enterQuery(evt) {
      if (evt.keyCode == 13) {
        getResults(searchbox.value);
      }
    }
    
    function getResults (query) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=ab8e5103c464904aa015d26efbdb8353`)
        .then(weather => {
          return weather.json();
        }).then(results);
    }
    
    function results (weather) {
      let city = document.querySelector('.location .city');
      city.innerText = `${weather.name}, ${weather.sys.country}`;
    
      let now = new Date();
      let date = document.querySelector('.location .date');
     
    
      let temprature = document.querySelector('.current .temprature');
      temprature.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
    
      let weather_el = document.querySelector('.current .weather');
      weather_el.innerText = weather.weather[0].main;
    
      let hilow = document.querySelector('.hi-low');
      hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
    }
    
    
    return element;
  }
  
  document.body.appendChild(component());