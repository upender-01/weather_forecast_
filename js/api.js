// js/api.js

// TODO: Replace with your actual OpenWeatherMap API Key
const API_KEY = '379e0703c0b41a12734518b98e9bd02c'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetches the current weather data for a given city.
 */
export async function fetchCurrentWeather(city) {
    const response = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
        throw new Error('City not found or network error occurred.');
    }
    return await response.json();
}

/**
 * Fetches the 5-day forecast data for a given city.
 */
export async function fetchForecast(city) {
    const response = await fetch(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
        throw new Error('Could not fetch forecast data.');
    }
    return await response.json();
}