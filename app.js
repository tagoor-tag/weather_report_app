// Function to fetch weather data based on latitude and longitude
async function fetchWeatherData(lat, lon) {
    const apiUrl = `https://my.meteoblue.com/packages/basic-1h_basic-day?apikey=7Cyne2zM8Xb1JDcV&lat=${lat}&lon=${lon}&asl=515&format=json`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data && data.current) {
            // Extract weather data from API response
            const temperature = data.current.temperature;
            const humidity = data.current.humidity;
            const description = data.current.weather.description;
            const windSpeed = data.current.wind.speed;

            // Update the UI with fetched data
            document.querySelector('.temp').textContent = `${temperature}°C`;
            document.querySelector('.city').textContent = description; // You can replace this with the city name or description
            document.querySelector('.humidity').textContent = `${humidity}%`;
            document.querySelector('.wind').textContent = `${windSpeed} km/h`;
            
            // Update weather icon based on the description
            const weatherIcon = document.querySelector('.weather-icon');
            if (description.includes('rain')) {
                weatherIcon.src = './images/rain.png';
            } else if (description.includes('cloud')) {
                weatherIcon.src = './images/cloud.png';
            } else {
                weatherIcon.src = './images/clear.png';
            }
        } else {
            alert('Error: Unable to retrieve weather data');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data');
    }
}

// Function to get coordinates (latitude, longitude) based on city name
async function getCityCoordinates(cityName) {
    const geocodingApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=7Cyne2zM8Xb1JDcV`;

    try {
        const response = await fetch(geocodingApiUrl);
        const data = await response.json();

        if (data && data.coord) {
            const lat = data.coord.lat;
            const lon = data.coord.lon;
            
            // Fetch the weather data using the coordinates
            fetchWeatherData(lat, lon);
        } else {
            alert('City not found!');
        }
    } catch (error) {
        console.error('Error fetching city coordinates:', error);
        alert('Error fetching city coordinates');
    }
}

// Event listener to trigger weather report when a city name is entered
document.querySelector('button').addEventListener('click', () => {
    const cityName = document.querySelector('input').value;
    if (cityName) {
        getCityCoordinates(cityName);
    } else {
        alert('Please enter a city name');
    }
});
