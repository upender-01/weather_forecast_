// js/storage.js

const STORAGE_KEY = 'weather_recent_searches';

export function getRecentSearches() {
    const searches = localStorage.getItem(STORAGE_KEY);
    return searches ? JSON.parse(searches) : [];
}

export function saveSearch(city) {
    let searches = getRecentSearches();
    
    // Prevent duplicates and formatting issues
    const formattedCity = city.trim().toLowerCase();
    
    if (!searches.includes(formattedCity)) {
        searches.unshift(formattedCity);
        // Keep only the last 5 searches
        if (searches.length > 5) searches.pop(); 
        localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
    }
}