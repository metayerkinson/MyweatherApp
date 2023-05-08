
// Global Variables
var city = ""; // variable to hold the city list
var cityList = []; // variable to hold the city list element
var cityListEl = document.querySelector("#searchHistory");
var citySearchEl = document.querySelector("#citySearch");
var citySearchFormEl = document.querySelector("#city-search-form");
var currentWeather = document.querySelector("#currentWeather");
var currentCityEl = document.querySelector("#cityName");
var currentTempEl = document.querySelector("#currentTemp");
var currentHumidityEl = document.querySelector("#currentHumidity");
var currentWindEl = document.querySelector("#currentWind");
var currentUvEl = document.querySelector("#currentUV");
var forecastEl = document.querySelector("#fiveDayForecast");
var forecastTitle = document.querySelector("#forecast-title");
var forecastWindEl = document.querySelector("#forecastWind");

// API Key
var apiKey = "a21465154dcfd209d235adf77262204e";
let cityExist = false;
// function to get the current weather
var getCurrentWeather = function (city) {
  // format the weather api url
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=imperial";

  // make a request to the url
  fetch(apiUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          displayCurrentWeather(data, city);
          console.log(data);
          saveCityList();
          renderCityList();
          currentWeather.style.border = "2px solid grey";
          cityListEl.style.borderTop = "2px solid grey";
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to OpenWeather");
    });
};

// function to get the city list
var getCityList = function () {
  // get city list from local storage
  var storedCityList = JSON.parse(localStorage.getItem("cityList"));

  // if cities were retrieved from localStorage, update the city list array to it
  if (storedCityList !== null) {
    cityList = storedCityList;
  }

  // render city list to the DOM
  renderCityList();
};

// function to save the city list
var saveCityList = function () {
  // set new array to local storage

  localStorage.setItem("cityList", JSON.stringify(cityList));
};

// function to render the city list
var renderCityList = function () {
  // clear city list element
  cityListEl.innerHTML = "";

  // render a new li for each city
  for (var i = 0; i < cityList.length; i++) {
    var city = cityList[i];
    // if( storedCityList.includes(city) === false){

    var li = document.createElement("li");
    li.textContent = city;
    li.setAttribute("data-index", i);

    // var button = document.createElement("button");
    // button.textContent = "Search";

    // li.appendChild(button);
    cityListEl.appendChild(li);
  }
};

// function to render the current weather
var displayCurrentWeather = function (weather, searchCity) {
  // clear old content
  currentCityEl.textContent = "";
  currentTempEl.textContent = "";
  currentHumidityEl.textContent = "";
  currentWindEl.textContent = "";
  currentUvEl.textContent = "";

  // format the date
  var currentDate = new Date(weather.dt * 1000);
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  currentDate = month + "/" + day + "/" + year;

  // create html content for current weather
  var cityNameEl = document.createElement("span");
  cityNameEl.textContent = searchCity + " (" + currentDate + ") ";

  var weatherIcon = document.createElement("img");
  weatherIcon.setAttribute(
    "src",
    "https://openweathermap.org/img/wn/" + weather.weather[0].icon + ".png"
  );
  cityNameEl.appendChild(weatherIcon);

  var temperatureEl = document.createElement("span");
  temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
  temperatureEl.classList = "list-group-item";

  var humidityEl = document.createElement("span");
  humidityEl.textContent = "Humidity: " + weather.main.humidity + "%";
  humidityEl.classList = "list-group-item";

  var windSpeedEl = document.createElement("span");
  windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
  windSpeedEl.classList = "list-group-item";

  //   var UVEl = document.createElement("span");
  //   UVEl.textContent = "UV: " + getUvIndex(weather.coord.lat, weather.coord.lon);
  //   UVEl.classList = "list-group-item";

  // append to page
  currentCityEl.appendChild(cityNameEl);
  currentTempEl.appendChild(temperatureEl);
  currentHumidityEl.appendChild(humidityEl);
  currentWindEl.appendChild(windSpeedEl);
  //   currentUvEl.appendChild(UVEl);

  // get the UV index
  // getUvIndex(weather.coord.lat, weather.coord.lon);
};

// function to handle the search form submit
var formSubmitHandler = function (event) {
  event.preventDefault();
  console.log(citySearchEl.value);
  // get value from input element
  var city = citySearchEl.value.trim();

  if (city) {
    getCurrentWeather(city);
    // getForecast(city);
    getCityList();
    citySearchEl.value = "";

    // add new city to city list array, clear the old list, update the list array, save to local storage, re-render the list
    if (cityList.includes(city) === false) {
      cityList.push(city);
    }
    cityListEl.innerHTML = "";

    // saveCityList(city);
    // renderCityList();
  } else {
    alert("Please enter a City");
  }
};

// function to handle the clear history button click

// function to handle the page load
var pageLoadHandler = function () {
  // get city list from local storage
  var savedCityList = localStorage.getItem("cityList");

  // if there is a saved city list, update the city list array to it
  if (savedCityList) {
    cityList = JSON.parse(savedCityList);
  }

  // render city list to page
  renderCityList();
};

// event listeners
citySearchFormEl.addEventListener("submit", formSubmitHandler);
// cityListEl.addEventListener("click", cityClickHandler);
// clearHistoryEl.addEventListener("click", clearHistoryHandler);
// window.addEventListener("load", pageLoadHandler);