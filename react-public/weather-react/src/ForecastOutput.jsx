export default function ForecastOutput({ data }) {
    if (!data) return null;
    return <div id="weather-output">
        <div id="forecast-section">
            <h3>5-Day Forecast:</h3>
            {data.list.map((entry, index) => {
                if (index % 8 === 0) {
                    const date = new Date(entry.dt * 1000);
                    const options = { weekday: 'long' };
                    const dayName = date.toLocaleDateString('en-US', options);
                    return <div key={index}>
                        <h4>{dayName}</h4>
                        <p>Temperature: {entry.main.temp}°F</p>
                        <p>Weather: {entry.weather[0].description}</p>
                    </div>
                }
            })}
        </div>
    </div>
}