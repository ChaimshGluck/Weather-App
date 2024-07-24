export default function WeatherOutput({ data }) {
    if (!data) return null;
    const locationName = data.location || data.name;
    
    return <div id="weather-output">
        <div id="weather-section">
            <h2>Weather in {locationName}</h2>
            <p>Current Temperature: {data.main.temp}°F</p>
            <p>Feels like: {data.main.feels_like}</p>
            <p>Weather: {data.weather[0].description}</p>
            <p>Humidity: {data.main.humidity}%</p>
            <p>Wind Speed: {data.wind.speed} m/s</p>
        </div>
    </div>
}