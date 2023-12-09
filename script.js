const apiKey = 'API_KEY'; 

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showWeather, showError);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function showWeather(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Unable to fetch weather data. Please try again later.');
        });
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert('User denied the request for Geolocation. Please enter a location manually.');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable. Please enter a location manually.');
            break;
        case error.TIMEOUT:
            alert('The request to get user location timed out. Please enter a location manually.');
            break;
        case error.UNKNOWN_ERROR:
            alert('An unknown error occurred. Please enter a location manually.');
            break;
    }
}

function displayWeather(weatherData) {
    const weatherBox = document.getElementById('weatherBox');
    const weatherInfo = document.getElementById('weatherInfo');

    const cityName = weatherData.name;
    const temperature = weatherData.main.temp;
    const description = weatherData.weather[0].description;

    const html = `
        <p>Location: ${cityName}</p>
        <p>Temperature: ${temperature}°C</p>
        <p>Weather: ${description}</p>
    `;

    weatherInfo.innerHTML = html;
}
