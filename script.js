const apiKey = '253dbf2a02d9f5d9d0a1fe087c18618d';  
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q={Mysore}&appid={253dbf2a02d9f5d9d0a1fe087c18618d}
';

async function getWeatherByCity(city) {
    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        if (response.ok) {
            displayWeather(data);
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        document.getElementById('weatherDetails').innerHTML = `Error: ${error.message}`;
    }
}

async function getWeatherByCoordinates(lat, lon) {
    try {
        const response = await fetch(`${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        if (response.ok) {
            displayWeather(data);
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        document.getElementById('weatherDetails').innerHTML = `Error: ${error.message}`;
    }
}

function displayWeather(data) {
    const weatherDetails = `
        City: ${data.name} <br>
        Temperature: ${data.main.temp}°C <br>
        Weather: ${data.weather[0].description} <br>
        Humidity: ${data.main.humidity}% <br>
        Wind Speed: ${data.wind.speed} m/s
    `;
    document.getElementById('weatherDetails').innerHTML = weatherDetails;
}

document.getElementById('locationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const city = document.getElementById('location').value;
    getWeatherByCity(city);
});

document.getElementById('getLocation').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByCoordinates(lat, lon);
        }, () => {
            document.getElementById('weatherDetails').innerHTML = 'Unable to retrieve your location';
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});
