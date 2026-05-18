window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
var getKeyDown = player.getKeyDown;
var keydown = player.keydown;
var keyup = player.keyup;
window.Script1 = function()
{
  document.querySelector('[data-model-id="6fhFJTvDsGM"]').classList.add('hidden');
}

window.Script2 = function()
{
  var player = GetPlayer();
var input = player.GetVar("stateNameInputField");
var upperInput = input.toUpperCase();
player.SetVar("stateNameInputField", upperInput);
}

window.Script3 = function()
{
  var player = GetPlayer();
var input = player.GetVar("cityNameInputField");
var capitalized = input.charAt(0).toUpperCase() + input.slice(1);
player.SetVar("cityNameInputField", capitalized);
}

window.Script4 = function()
{
  (() => {
    let player = GetPlayer();
    
    // Google maps api key
    let gglApiKey = "AIzaSyBzUzjgjcf7pQMpcIIdwYfvcIq4oyrGg2w";
    // Open Weather api key
    let owApiKey = "0ecda4f2c23180748c31cf6d8c0df2a7";
    
    // Get location input values from UI
    let cName = player.GetVar("cityNameInputField");
    let sName = player.GetVar("stateNameInputField");
    let ctryName = player.GetVar("countryNameInputField");
    
    // Containers for Longitude and Latitude data from OW
    let lon = 0;
    let lat = 0;
	
	// OpenWeather Geocoding to get lat and lon values from a city name
	let owUrl = "http://api.openweathermap.org/geo/1.0/direct?q="+cName+","+sName+","+ctryName+"&limit=1&appid="+owApiKey;
	fetch(owUrl)
  		.then(response => response.json())
  		.then(data => {
    		// Push the returned data into Vars
    		lon = data[0].lon
    		lat = data[0].lat
		})
		.catch(error => {
			console.error('Error fetching data:', error);
		});
	
	// Google Weather URL
	let gglUrl = "https://weather.googleapis.com/v1/currentConditions:lookup?key="+gglApiKey+"&location.latitude="+lat+"&location.longitude="+lon+"&unitsSystem=IMPERIAL"
	fetch(gglUrl)
		.then(response => response.json())
		.then(data => {
    		// Push the returned data into your Storyline variables
    		
    		// Is it day or night
    		let isDayTime = data.isDaytime;
    		// Current date and time with formatting
    		let now = new Date();
			let currentTime = now.toLocaleTimeString([], {
  				hour: 'numeric',
  				minute: '2-digit',
  				hour12: true
			});
    		player.SetVar("currentTime", currentTime);
    		
    		let currentDate = now.toLocaleDateString('en-us', {
    			weekday: 'long',
    			day: 'numeric',
    			month: 'long',
    			year: 'numeric'
    		});
    		player.SetVar("currentDate", currentDate);
    		
    		player.SetVar("weatherCondition", data.weatherCondition.description.text);
    		player.SetVar("temperature", data.temperature.degrees);
    		player.SetVar("dewPoint",data.dewPoint.degrees);
    		player.SetVar("humidity", data.relativeHumidity);
    		
    		console.log(data);
		})
		.catch(error => {
			console.error('Error fetching data:', error);
		});
})();
}

};
