import { useState } from 'react';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import './App.css';
import CurrentWeather from './components/current-weather/current-weather';
import Search from './components/search/search';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(' ');

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forcastResponse });
      })
      .catch((err) => console.log(err));
  };

  console.log(currentWeather);
  console.log(forecast);
  return (
    <div className="conatiner">
      <Search onSearchChange={handleOnSearchChange}></Search>
      {currentWeather && (
        <CurrentWeather data={currentWeather}></CurrentWeather>
      )}
    </div>
  );
}

export default App;
