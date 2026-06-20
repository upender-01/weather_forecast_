// js/app.js
import { fetchCurrentWeather, fetchForecast } from './api.js';
import { getRecentSearches, saveSearch } from './storage.js';

// DOM Elements
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error-message');
const currentWeatherSection = document.getElementById('current-weather');
const forecastSection = document.getElementById('forecast');
const recentSearchesContainer = document.getElementById('recent-searches');

// Event Listeners
searchBtn.addEventListener('click', () => handleSearch(cityInput.value));
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch(cityInput.value);
});

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderRecentSearches();
    const recent = getRecentSearches();
    if (recent.length > 0) {
        handleSearch(recent[0]); // Load last searched city on startup
    }
});

// Main Controller Function
async function handleSearch(city) {
    if (!city) return;

    // UI Reset & Loading State
    errorEl.classList.add('hidden');
    currentWeatherSection.classList.add('hidden');
    forecastSection.classList.add('hidden');
    loadingEl.classList.remove('hidden');

    try {
        const weatherData = await fetchCurrentWeather(city);
        const forecastData = await fetchForecast(city);

        updateCurrentWeatherUI(weatherData);
        updateForecastUI(forecastData);
        
        saveSearch(city);
        renderRecentSearches();

        // Show Results
        loadingEl.classList.add('hidden');
        currentWeatherSection.classList.remove('hidden');
        forecastSection.classList.remove('hidden');
        cityInput.value = ''; // clear input

    } catch (error) {
        loadingEl.classList.add('hidden');
        errorEl.textContent = error.message;
        errorEl.classList.remove('hidden');
    }
}

// UI Updating Functions
function updateCurrentWeatherUI(data) {
    document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('weather-description').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind-speed').textContent = data.wind.speed;
    document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}

function updateForecastUI(data) {
    const container = document.getElementById('forecast-container');
    container.innerHTML = ''; // clear previous

    // The API returns data every 3 hours (40 items). We filter to get 1 reading per day (e.g., at 12:00:00).
    const dailyData = data.list.filter(item => item.dt_txt.includes('12:00:00'));

    dailyData.forEach(day => {
        const date = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        const temp = Math.round(day.main.temp);
        const icon = day.weather[0].icon;

        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <h4>${date}</h4>
            <img src="http://openweathermap.org/img/wn/${icon}.png" alt="icon">
            <p><strong>${temp}°C</strong></p>
        `;
        container.appendChild(card);
    });
}

function renderRecentSearches() {
    recentSearchesContainer.innerHTML = '';
    const searches = getRecentSearches();
    
    searches.forEach(city => {
        const chip = document.createElement('span');
        chip.className = 'recent-chip capitalize';
        chip.textContent = city;
        chip.addEventListener('click', () => handleSearch(city));
        recentSearchesContainer.appendChild(chip);
    });
}