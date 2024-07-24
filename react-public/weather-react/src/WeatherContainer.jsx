import { useState } from "react"
import WeatherOutput from "./WeatherOutput";
import ForecastOutput from "./ForecastOutput";

export default function WeatherContainer() {
    const [cityName, setCityName] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [weatherRecieved, setWeatherRecieved] = useState(false);
    const [forecastRecieved, setForecastRecieved] = useState(false);

    async function getWeather() {
        const response = await fetch(`http://localhost:3001/weather?cityname=${cityName}`);
        const data = await response.json();
        setWeatherData(data);
        setWeatherRecieved(true);
    }

    async function getForecast() {
        const response = await fetch(`http://localhost:3001/forecast?cityname=${cityName}`);
        const data = await response.json();
        setForecastData(data);
        setForecastRecieved(true);
    }

    async function getWeatherByCoords() {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const response = await fetch(`http://localhost:3001/coords/weather?lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            setWeatherData(data);
            setWeatherRecieved(true);
        })
    }

    async function getForecastByCoords() {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const response = await fetch(`http://localhost:3001/coords/forecast?lat=${latitude}&lon=${longitude}`);
                const data = await response.json();
                setForecastData(data);
                setForecastRecieved(true);
            } catch (error) {
                console.error('Error fetching forecast data:', error);
            }
        },
            (error) => {
                console.error('Error getting geolocation:', error);
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        )
    }

    return <div id="weather-container">
        <h1>Weather App</h1>
        <label htmlFor="city-name">Enter the name of your city</label>
        <input
            id="city-name"
            type="text"
            name="city-name"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="e.g., New York"
        />
        <button type="button" id="enter-button" onClick={() => { getWeather(), getForecast() }}>Enter</button>
        <button type="button" id="location-button" onClick={() => { getWeatherByCoords(), getForecastByCoords() }}>Use Current Location</button>
        {weatherRecieved && <WeatherOutput data={weatherData} />}
        {forecastRecieved && <ForecastOutput data={forecastData} />}
    </div>
}