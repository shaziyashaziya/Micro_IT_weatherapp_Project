const apiKey = '885e022dd105c2a22fb10faead4b35cd'; // 🔁 Replace with your actual OpenWeatherMap API key

// 🔍 Function to get weather by coordinates (from geolocation)
function getWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(err => alert("Error fetching weather."));
}

// 🔍 Function to get weather by city name (manual input)
function getWeatherByCity() {
  const city = document.getElementById('cityInput').value;
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        displayWeather(data);
      } else {
        alert("City not found.");
      }
    })
    .catch(err => alert("Error fetching weather."));
}

// 🌍 Automatically get weather based on user's current location
function getWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getWeatherByCoords(lat, lon);
      },
      error => {
        alert("Location access denied. Please enter a city manually.");
        // Optional: You could default to a city like "Delhi"
        // getWeatherByCity("Delhi");
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}

// 🎯 Function to display weather info in the DOM
function displayWeather(data) {
  const resultDiv = document.getElementById('weatherResult');
  resultDiv.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
    <p>🌡️ Temperature: ${data.main.temp}°C</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon"/>
  `;
}
