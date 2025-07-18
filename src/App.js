import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name.');
      setWeather(null);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2bb126308cb73ac4e1b9339f920924f3&units=metric`
      );
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeather(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="container fade-in" style={{
      backgroundImage: `url('/backgrounds/minimal.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      padding: '30px',
      color: '#fff'
    }}>
      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '20px', padding: '30px' }}>
        <h1 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '20px' }}>🌤 Weather App</h1>
        {!weather ? (
          <>
            <div className="input-section">
              <input
                type="text"
                className="input"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <button className="button" onClick={fetchWeather}>Search</button>
            </div>
            {error && <p className="error">{error}</p>}
          </>
        ) : (
          <>
            <div className="weather-box">
              <h2>{weather.name}, {weather.sys.country}</h2>
              <p>{weather.weather[0].description}</p>
              <div className="temperature">{Math.round(weather.main.temp)}°C</div>
              <p>Feels like {Math.round(weather.main.feels_like)}°C</p>
              <div className="cards">
                <div className="card">
                  <p>🌬 Wind Speed</p>
                  <p>{weather.wind.speed} km/h</p>
                </div>
                <div className="card">
                  <p>💧 Humidity</p>
                  <p>{weather.main.humidity}%</p>
                </div>
                <div className="card">
                  <p>👁️ Visibility</p>
                  <p>{weather.visibility / 1000} km</p>
                </div>
                <div className="card">
                  <p>🌡 Pressure</p>
                  <p>{weather.main.pressure} hPa</p>
                </div>
                <div className="card">
                  <p>🌅 Sunrise</p>
                  <p>{formatTime(weather.sys.sunrise)}</p>
                </div>
                <div className="card">
                  <p>🌇 Sunset</p>
                  <p>{formatTime(weather.sys.sunset)}</p>
                </div>
              </div>
            </div>
            <button className="button" style={{ marginTop: '20px' }} onClick={() => {
              setWeather(null);
              setCity('');
            }}>🔙 Search Another City</button>
          </>
        )}
      </div>
    </div>
  );
};

export default App;