const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;
const API_KEY = '84e7fc913c85036d42a2718d6ece97f6';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log(`App started at: ${new Date().toISOString()}`);
console.log(`Author: Przemyslaw Kopec`);
console.log(`Listening on TCP port: ${PORT}`);

app.get('/', (req, res) => {
    res.send(`
    <html>
    <body>
    <h2>Sprawdź pogodę</h2>
    <form method="POST" action="/weather">
    <label>Kraj:</label>
    <select name="country">
    <option value="PL">Polska</option>
    <option value="DE">Niemcy</option>
    <option value="US">USA</option>
    </select><br><br>

    <label>Miasto:</label>
    <select name="city">
    <option value="Warsaw">Warszawa</option>
    <option value="Berlin">Berlin</option>
    <option value="New York">Nowy Jork</option>
    </select><br><br>

    <button type="submit">Pokaż pogodę</button>
    </form>
    </body>
    </html>
    `);
});

app.post('/weather', async (req, res) => {
    const { country, city } = req.body;

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${API_KEY}`
        );

        const weather = response.data;
        res.send(`
        <h3>Pogoda dla ${city}, ${country}</h3>
        <p>Temperatura: ${weather.main.temp} °C</p>
        <p>Opis: ${weather.weather[0].description}</p>
        <p>Wilgotność: ${weather.main.humidity}%</p>
        <p>Wiatr: ${weather.wind.speed} m/s</p>
        <a href="/">Wróć</a>
        `);
    } catch (err) {
        res.send('<p>Nie udało się pobrać danych pogodowych. Spróbuj ponownie.</p><a href="/">Wróć</a>');
    }
});

app.listen(PORT);
