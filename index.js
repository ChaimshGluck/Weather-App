import express from 'express';
import cors from 'cors';
import 'dotenv/config';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = process.env.API_KEY;

app.get('/weather', async (req, res) => {
    const cityname = req.query.cityname;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=imperial`, {
        method: "GET",
        headers: { accept: "application/json" }
    });
    const data = await response.json();
    res.json(data);
});

app.get('/forecast', async (req, res) => {
    const cityname = req.query.cityname;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${apiKey}&units=imperial`);
    const data = await response.json();
    res.json(data);
})

app.get('/coords/weather', async (req, res) => {
    const lat = req.query.lat, lon = req.query.lon;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`);
    const data = await response.json();
    res.json(data);
});

app.get('/coords/forecast', async (req, res) => {
    const lat = req.query.lat, lon = req.query.lon;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`);
    const data = await response.json();
    res.json(data);
})

app.listen('3001', () => {
    console.log(`Starting server`)
});