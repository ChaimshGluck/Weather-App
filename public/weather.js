document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#enter-button").addEventListener('click', () => {
        let cityName = document.querySelector('#city-name').value;
        getWeather(cityName);
        getForecast(cityName);
    });

    document.querySelector("#location-button").addEventListener('click', () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            getWeatherByCoords(latitude, longitude);
            getForecastByCoords(latitude, longitude);
        }, (error) => {
            console.error('Error getting location:', error);
            alert("Unable to retrieve your location. Allow location to get your area's weather");
        });
    });
});

async function getWeather(city) {
    document.querySelector("#loading").style.display = "block";
    try {
        const response = await fetch(`http://localhost:3001/weather?cityname=${city}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error(error);
        document.querySelector("#weather-section").textContent = 'Error: ' + error.message;
    } finally {
        document.querySelector("#loading").style.display = "none";
    }
}

async function getWeatherByCoords(lat, lon) {
    document.querySelector("#loading").style.display = "block";

    try {
        const response = await fetch(`http://localhost:3001/coords/weather?lat=${lat}&lon=${lon}`);
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        document.querySelector("#weather-section").textContent = 'Error: ' + error.message;
    } finally {
        document.querySelector("#loading").style.display = "none";
    }
}

async function getForecast(city) {

    try {
        const response = await fetch(`http://localhost:3001/forecast?cityname=${city}`);
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        document.querySelector("#forecast-section").textContent = 'Error: ' + error.message;
    }
}

async function getForecastByCoords(lat, lon) {

    try {
        const response = await fetch(`http://localhost:3001/coords/forecast?lat=${lat}&lon=${lon}`);
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();
        displayForecast(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        document.querySelector("#forecast-section").textContent = 'Error: ' + error.message;
    }
}

// let object = {
//     "coord": {
//         "lon": -73.9496,
//         "lat": 40.6501
//     },
//     "weather": [{
//         "id": 802,
//         "main": "Clouds",
//         "description": "scattered clouds",
//         "icon": "03d"
//     }],
//     "base": "stations",
//     "main": {
//         "temp": 84.61,
//         "feels_like": 93.31,
//         "temp_min": 81.88,
//         "temp_max": 89.91,
//         "pressure": 1011,
//         "humidity": 74,
//         "sea_level": 1011,
//         "grnd_level": 1010
//     },
//     "visibility": 10000,
//     "wind": {
//         "speed": 5.75,
//         "deg": 180
//     },
//     "clouds": {
//         "all": 40
//     },
//     "dt": 1721059533,
//     "sys": {
//         "type": 2,
//         "id": 2080536,
//         "country": "US",
//         "sunrise": 1721036271,
//         "sunset": 1721089522
//     },
//     "timezone": -14400,
//     "id": 5110302,
//     "name": "Brooklyn",
//     "cod": 200
// }

// function displayWeather(data) {
//     let weatherHTML = `
//         <h2>Weather in ${data.name}</h2>
//         <p>Current Temperature: ${data.main.temp}°F</p>
//         <p>Feels like: ${data.main.feels_like}</p>
//         <p>Weather: ${data.weather[0].description}</p>
//         <p>Humidity: ${data.main.humidity}%</p>
//         <p>Wind Speed: ${data.wind.speed} m/s</p>
//     `;

//     document.querySelector("#weather-section").innerHTML = weatherHTML;
// }

function displayWeather(data) {
    let locationName = data.location || data.name;
    let weatherHTML = `
        <h2>Weather in ${locationName}</h2>
        <p>Current Temperature: ${data.main.temp}°F</p>
        <p>Feels like: ${data.main.feels_like}</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;

    document.querySelector("#weather-section").innerHTML = weatherHTML;
}


function displayForecast(data) {
    let forecastHTML = `<h3>5-Day Forecast:</h3>`;

    data.list.forEach((entry, index) => {
        if (index % 8 === 0) { // Show one entry per day
            const date = new Date(entry.dt * 1000);
            const options = { weekday: 'long' };
            const dayName = date.toLocaleDateString('en-US', options);
            forecastHTML += `
                <h4>${dayName}</h4>
                <p>Temperature: ${entry.main.temp}°F</p>
                <p>Weather: ${entry.weather[0].description}</p>
            `;
        }
    });

    document.querySelector("#forecast-section").innerHTML = forecastHTML;
}

// document.addEventListener('DOMContentLoaded', () => {
//     document.querySelector("#enter-button").addEventListener('click', () => {
//         let cityName = document.querySelector('#city-name').value;
//         getWeather(cityName);
//         getForecast(cityName);
//     });

//     document.querySelector("#location-button").addEventListener('click', () => {
//         navigator.geolocation.getCurrentPosition((position) => {
//             const { latitude, longitude } = position.coords;
//             getWeatherByCoords(latitude, longitude);
//             getForecastByCoords(latitude, longitude);
//         }, (error) => {
//             console.error('Error getting location:', error);
//             alert("Unable to retrieve your location. Allow location to get your area's weather");
//         });
//     });
// });

// const apiKey = "9375f838d368747227c354551454c94f";

// async function getWeather(city) {
//     document.querySelector("#loading").style.display = "block";
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

//     try {
//         const response = await fetch(url, {
//             method: "GET",
//             headers: {accept: "application/json"}
//         });
//         if (!response.ok) {
//             throw new Error('Network response was not ok: ' + response.statusText);
//         }
//         const data = await response.json();
//         displayWeather(data);
//     } catch (error) {
//         console.error('There has been a problem with your fetch operation:', error);
//         document.querySelector("#weather-section").textContent = 'Error: ' + error.message;
//     } finally {
//         document.querySelector("#loading").style.display = "none";
//     }
// }

// async function getWeatherByCoords(lat, lon) {
//     const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
//     document.querySelector("#loading").style.display = "block";

//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error('Network response was not ok: ' + response.statusText);
//         }
//         const data = await response.json();
//         displayWeather(data);
//     } catch (error) {
//         console.error('There has been a problem with your fetch operation:', error);
//         document.querySelector("#weather-section").textContent = 'Error: ' + error.message;
//     } finally {
//         document.querySelector("#loading").style.display = "none";
//     }
// }

// async function getForecast(city) {
//     const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error('Network response was not ok: ' + response.statusText);
//         }
//         const data = await response.json();
//         displayForecast(data);
//     } catch (error) {
//         console.error('There has been a problem with your fetch operation:', error);
//         document.querySelector("#forecast-section").textContent = 'Error: ' + error.message;
//     }
// }

// async function getForecastByCoords(lat, lon) {
//     const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error('Network response was not ok: ' + response.statusText);
//         }
//         const data = await response.json();
//         displayForecast(data);
//     } catch (error) {
//         console.error('There has been a problem with your fetch operation:', error);
//         document.querySelector("#forecast-section").textContent = 'Error: ' + error.message;
//     }
// }

// function displayWeather(data) {
//     let weatherHTML = `
//         <h2>Weather in ${data.name}</h2>
//         <p>Current Temperature: ${data.main.temp}°F</p>
//         <p>Weather: ${data.weather[0].description}</p>
//         <p>Humidity: ${data.main.humidity}%</p>
//         <p>Wind Speed: ${data.wind.speed} m/s</p>
//     `;

//     document.querySelector("#weather-section").innerHTML = weatherHTML;
// }

// function displayForecast(data) {
//     let forecastHTML = `<h3>5-Day Forecast:</h3>`;

//     data.list.forEach((entry, index) => {
//         if (index % 8 === 0) { // Show one entry per day
//             const date = new Date(entry.dt * 1000);
//             const options = { weekday: 'long' };
//             const dayName = date.toLocaleDateString('en-US', options);
//             forecastHTML += `
//                 <h4>${dayName}</h4>
//                 <p>Temperature: ${entry.main.temp}°F</p>
//                 <p>Weather: ${entry.weather[0].description}</p>
//             `;
//         }
//     });

//     document.querySelector("#forecast-section").innerHTML += forecastHTML;
// }