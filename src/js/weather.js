const weather = {};
const weatherWidget = document.getElementById('weatherJs');
const weatherElements = weatherWidget.children;
const temperature = weatherElements[0];
const description = weatherElements[1];
const key = 'cc08a9b6485ede7aabff209e9615c53b';

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition);
}

function setPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

function getWeather(latitude, longitude) {
    var api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}&lang=ru`;

    fetch(api)
        .then(response => {
            var data = response.json();
            return data;
        })
        .then(data => {
            weather.temperature = stringifyTemperature(data.main.temp);
            weather.description = data.weather[0].description;
            displayWeather();
        });
}

function displayWeather() {
    temperature.textContent = weather.temperature;
    description.textContent = weather.description;
    weatherWidget.hidden = false;
}

function stringifyTemperature(temp) {
    temp = Math.round(temp);
    if (temp > 0) {
        temp = `+${temp}`;
    } else if (temp < 0) {
        temp = `-{$temp}`;
    }
    return `${temp}°C`;
}