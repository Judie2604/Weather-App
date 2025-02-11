
const apiKey = 'ef627bcf03dfa97bce432feab3c8e605';  
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Function to fetch weather data
async function getWeather(city) {
    console.log(`Fetching weather for city: ${city}`);  // Log the city name
    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        console.log('API Response:', data);  // Log the API response

        // Check if the response contains weather data
        if (data.cod === 200) {
            displayWeather(data);
        } else {
            displayError(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error('Fetch Error:', error);  // Log any network errors
        displayError('Network error or invalid API key.');
    }
}

// Function to display weather data on the page
function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
        <h3>Weather in ${data.name}</h3>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Description: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    console.log('Weather data displayed');
}

// Function to display an error message
function displayError(message) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `<p style="color: red;">${message}</p>`;
    console.log('Error displayed:', message);
}

// Event listener for the button click
document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if (city) {
        getWeather(city);
    } else {
        displayError('Please enter a city name.');
    }
});
