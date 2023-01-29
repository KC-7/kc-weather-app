// Get the form element
const cityForm = document.querySelector("#city-form");

// Listen for form submission
cityForm.addEventListener("submit", getWeather);

// Get Weather function
function getWeather(e) {
    e.preventDefault();
  
    // Fetch the creds.json file
    fetch("creds.json")
      .then(response => response.json())
      .then(creds => {
        const apiKey = creds.apiKey;
  
        // Get the value of the city input field
        const cityInput = document.querySelector("#city-input").value;
  
        // Split the input value into an array of city names
        const cityNames = cityInput.split(",");
  
        // Loop through the city names array
        cityNames.forEach(function(city) {
          // Trim the whitespace from each city name
          city = city.trim();
          // Make a request to the weather API using the city name
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(function(response) {
              return response.json();
            })
            .then(function(data) {
              // Log the weather data to the console
              console.log(data);
              // Create a new table row for each city
              const row = document.createElement("tr");
              // Create a cell for the city name
              const cityCell = document.createElement("td");
              // Display city in uppercase
              cityCell.textContent = city.toUpperCase();
              // Create a cell for the temperature
              const tempCell = document.createElement("td");
              // Rounds result to one decimal point
              tempCell.textContent = data.main.temp.toFixed(1);
              // Create a cell for the humidity
              const humidityCell = document.createElement("td");
              humidityCell.textContent = data.main.humidity;
              // Create a cell for the wind speed
              const windCell = document.createElement("td");
              // Rounds result to nearest whole number
              windCell.textContent = Math.round(data.wind.speed);
              // Append the cells to the row
              row.appendChild(cityCell);
              row.appendChild(tempCell);
              row.appendChild(humidityCell);
              row.appendChild(windCell);
              // Get the table element
              const weatherTable = document.querySelector("#weather-table");
              // Append the row to the table
              weatherTable.appendChild(row);
            })
            .catch(function(error) {
              console.log(error);
            });
        });
    });
}
  
