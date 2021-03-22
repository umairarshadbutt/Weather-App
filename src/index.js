import _ from 'lodash';
import './style.css';

function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  const searchbox = document.querySelector('.search-box');
  function dates(d) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }
  function results(weather) {
    const city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    const now = new Date();
    const date = document.querySelector('.location .date');
    date.innerText = dates(now);

    const temprature = document.querySelector('.current .temprature');
    temprature.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    const weatherElement = document.querySelector('.current .weather');
    weatherElement.innerText = weather.weather[0].main;

    const hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
  }
  function getResults(query) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=ab8e5103c464904aa015d26efbdb8353`)
      .then(weather => weather.json()).then(results);
  }

  function enterQuery(evt) {
    if (evt.keyCode === 13) {
      getResults(searchbox.value);
    }
  }
  searchbox.addEventListener('keypress', enterQuery);


  return element;
}

document.body.appendChild(component());