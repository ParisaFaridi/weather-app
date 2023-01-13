let day = document.querySelector(".day");
let time = document.querySelector(".time");
let city = document.querySelector(".city");
let searchBtn = document.querySelector(".search-btn");
let searchInput = document.querySelector(".search-input");
let temperature = document.querySelector(".temperature");
let toCelciusBtn = document.querySelector(".celcius");
let toFahranhiteBtn = document.querySelector(".fahranhite");
let currentBtn = document.querySelector(".current");
let date = new Date();
let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let temp = 7;
let apiKey = "62bc298785543e137bc6756e514eb1c3";
let baseURL = `https://api.openweathermap.org/data/2.5/weather?`;
function searchCity(cityIn) {
  axios
    .get(`${baseURL}q=${cityIn}&appid=${apiKey}&&units=metric`)
    .then(function (response) {
      temp = response.data.main.temp;
      temperature.innerHTML = `${Math.round(temp)}°C`;
      city.innerHTML = response.data.name;
    });
}
day.innerHTML = week[date.getDay()];
time.innerHTML = `${date.getHours()}:${date.getMinutes()}`;
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  if (searchInput.value === null || searchInput.value === "") {
    return;
  }
  searchCity(searchInput.value);
});
toCelciusBtn.addEventListener("click", function (event) {
  event.preventDefault();
  temperature.innerHTML = `${temp}°C`;
});
toFahranhiteBtn.addEventListener("click", function (event) {
  event.preventDefault();
  temperature.innerHTML = `${Math.round(temp * 1.8 + 32)}°F`;
});
currentBtn.addEventListener("click", function (event) {
  event.preventDefault();
  showCurrentLocation();
});
function showCurrentLocation() {
  let lon = 0;
  let lat = 0;
  navigator.geolocation.getCurrentPosition(function (position) {
    lon = position.coords.longitude;
    lat = position.coords.latitude;
  });
  axios
    .get(`${baseURL}lat=${lat}&lon=${lon}&appid=${apiKey}&&units=metric`)
    .then(function (response) {
      temp = response.data.main.temp;
      console.log(lat, lon);
      temperature.innerHTML = `${Math.round(temp)}°C`;
      city.innerHTML = response.data.name;
    });
}
