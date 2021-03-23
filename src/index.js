import './style.css';

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
  temprature.innerHTML = `${Math.round(weather.main.temp)}<span>°c | </span>`;

  const tempratureF = document.querySelector('.current .tempratureF');
  tempratureF.innerHTML = `${Math.round((weather.main.temp * 1.8) + 32)}<span> F</span>`;

  const weatherElement = document.querySelector('.current .weather');
  weatherElement.innerText = weather.weather[0].main;
  const { icon } = weather.weather[0];
  const url = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  document.getElementById('imgId').src = url;
  const hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c | ${Math.round((weather.main.temp_min * 1.8) + 32)}F / ${Math.round((weather.main.temp_max * 1.8) + 32)} F`;
}
function getResults(query) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=ab8e5103c464904aa015d26efbdb8353`)
    .then(weather => weather.json()).then(results);
  // => arrow functions is used above
}

function enterQuery(evt) {
  if (evt.keyCode === 13) {
    getResults(searchbox.value);
  }
}
searchbox.addEventListener('keypress', enterQuery);
