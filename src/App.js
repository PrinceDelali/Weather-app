import React, { useState } from 'react';
import axios from 'axios';
import { FaCloudSun, FaWind, FaTint } from 'react-icons/fa'; // Import weather-related icons
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [bgClass, setBgClass] = useState('bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500');

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const getWeather = async () => {
    if (!city) return;
    const apiKey = '6d92a4b1cc4f159734bcfd47f11c721e'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
      setError('');
      setBackground(response.data.weather[0].main);
    } catch (error) {
      setWeatherData(null);
      setError('City not found. Please try again.');
    }
  };

  const setBackground = (weather) => {
    if (weather === 'Clear') {
      setBgClass('bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600');
    } else if (weather === 'Clouds') {
      setBgClass('bg-gradient-to-r from-gray-500 via-gray-700 to-gray-900');
    } else if (weather === 'Rain') {
      setBgClass('bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300');
    } else if (weather === 'Snow') {
      setBgClass('bg-gradient-to-r from-white via-gray-100 to-gray-400');
    } else if (weather === 'Thunderstorm') {
      setBgClass('bg-gradient-to-r from-indigo-800 via-indigo-900 to-black');
    } else {
      setBgClass('bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500');
    }
  };

  return (
    <div className={`App ${bgClass} min-h-screen flex items-center justify-center relative`}>
      <div className="w-full max-w-lg bg-white rounded-2xl p-10 shadow-2xl transform transition duration-500 hover:scale-105">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Weather Forecast</h1>

        <input
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Enter city"
          className="w-full p-4 rounded-lg text-gray-700 border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 mb-6"
        />

        <button
          onClick={getWeather}
          className="w-full p-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none transition duration-200"
        >
          Get Weather
        </button>

        {error && <p className="text-center text-red-500 mt-4">{error}</p>}

        {weatherData && (
          <div className="weather-info mt-8 bg-white rounded-2xl p-8 shadow-xl transform transition-all duration-300 hover:scale-105">
            {/* Weather Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800">{weatherData.name}, {weatherData.sys.country}</h2>
              <img 
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} 
                alt="Weather Icon" 
                className="w-20 h-20" 
              />
            </div>

            {/* Weather Description */}
            <p className="text-lg text-center text-gray-600 mb-6">{weatherData.weather[0].description}</p>

            {/* Weather Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 text-gray-700">
              <div className="flex items-center space-x-4">
                <FaCloudSun className="text-yellow-500 text-3xl" />
                <span className="font-semibold text-lg">Temperature: {weatherData.main.temp}°C</span>
              </div>
              <div className="flex items-center space-x-4">
                <FaWind className="text-blue-500 text-3xl" />
                <span className="font-semibold text-lg">Wind Speed: {weatherData.wind.speed} m/s</span>
              </div>
              <div className="flex items-center space-x-4">
                <FaTint className="text-blue-400 text-3xl" />
                <span className="font-semibold text-lg">Humidity: {weatherData.main.humidity}%</span>
              </div>
            </div>
          </div>
        )}
      </div>

     
    </div>
  );
}

export default App;
