# storylineWeatherApp

# <a href="https://cflanagan.github.io/storylineWeatherApp/WeatherApp/story.html" target="_blank">Launch Weather App</a>

Demo using Storyline to build an app that uses external data from the Google Weather API and Open Weather API.

Why two APIs? Google offers free weather data but not free Geocode data. Open Weather offers free Geocode data but not free Weather data. I need the Geocode data to enable search for City and State names. The search returns Longitude and Latitude information. The weather search API does take City and State name date but requires Lon and Lat data. So the app queries Open Weather's API for Lon and Lat data from using State and City input. The Google API returns weather data using the Lon and Lat values from Open Weather.
