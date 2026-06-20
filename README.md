# 🌤️ Weather Dashboard Application

## 📝 Project Overview
This project is a dynamic Weather Dashboard built to fetch and display real-time weather data and a 5-day forecast for any given city. The primary objective was to build a responsive, modular web application utilizing modern asynchronous JavaScript (`async/await`), third-party REST API integration (OpenWeatherMap), and client-side data persistence.

The application manages complex UI states (loading, success, error) and utilizes Local Storage to save and retrieve the user's most recent searches automatically.

---

## 🚀 Setup Instructions
Because this project utilizes ES6 Modules (`import`/`export`), it must be run via a local server to prevent CORS (Cross-Origin Resource Sharing) policy errors. 

1. **Clone or Download:** Clone this repository or download the ZIP file to your local machine.
2. **Get an API Key:** * Visit [OpenWeatherMap](https://openweathermap.org/) and create a free account.
   * Navigate to your profile and generate a free API Key.
3. **Configure the Project:**
   * Open the `js/api.js` file.
   * Replace the placeholder string `'YOUR_API_KEY_HERE'` with your actual OpenWeatherMap API key.
4. **Launch Local Server:** * Open the project folder in VS Code.
   * Right-click `index.html` and select **"Open with Live Server"** (requires the Live Server extension).

---

## 📂 Code & File Structure
The application strictly follows a modular JavaScript architecture, separating the network logic, data storage, and UI control into distinct files:

```text
Weather-Dashboard/
├── index.html       # Main semantic structure and UI layout
├── css/styles.css   # Responsive CSS styling with loading/error states
├── js/
│   ├── app.js       # Main controller: manages DOM, event listeners, and UI state
│   ├── api.js       # Network module: handles all async OpenWeatherMap API calls
│   └── storage.js   # Storage module: handles Local Storage read/write logic
├── screenshots/     # Directory containing visual proof of functionality
└── README.md        # Project documentation
