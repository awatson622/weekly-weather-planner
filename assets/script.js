var longitude;
var latitude;
var apiKey = "116b45a117c031423a95336301ac4350";
var cityName = document.getElementById("city-input");
var roadAlertsName; 
var roadAlertsLevel;


getLocation = function () {
    var apiEndpointLocation = 
    "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + ",CA,US-CA&limit=5&appid=" + apiKey;


    fetch(apiEndpointLocation)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        longitude = data[0].lat;
        latitude = data[0].lat;
    });
}

function getWeather() {
    var weatherCall = 'https://api.openweathermap.org/data/3.0/onecall?lat=' + 
    latitude + '&lon=' + longitude + '&units=imperial';

    fetch(weatherCall)
    .then(function(response) {
        if(!response.ok) {
            throw response.json();
        }

        return response.json();
    })
    .then(function(data) {
        console.log(data);
        
    })
}


getLocation();

getRoadCondition = function () {
    var apiEndpointRoadCondition = 
    "https://api.openweathermap.org/data/2.5/roadrisk?appid=" + apiKey;
    
    fetch(apiEndpointRoadCondition)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        roadAlertsName = data[0].alerts.event;
        roadAlertsLevel = data[0].alerts.event_level;
        
    });
}