var longitude;
var latitude;
var apiKey = "116b45a117c031423a95336301ac4350";

function getParams() {
    var searchParameters = document.location.search.split('=');
    var cityName = searchParameters[1];
    getLocation(cityName);
}


getLocation = function (cityName) {
    var apiEndpointLocation = 
    "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=" + apiKey;

    fetch(apiEndpointLocation)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        longitude = data[0].lon;
        latitude = data[0].lat;
        console.log(longitude, latitude);
        getWeather(latitude, longitude);
    });
}

function getWeather(latitude, longitude) {
    var weatherCall = 'https://api.openweathermap.org/data/3.0/onecall?lat='
    + latitude + '&lon=' + longitude + '&appid=' + apiKey;

    fetch(weatherCall)
    .then(function(response) {
        if(!response.ok) {
            throw response.json();
        }

        return response.json();
    })
    .then(function(response) {
        console.log(response);
        
    })
}



getRoadCondition = function () {
    var apiEndpointRoadCondition = 
    "https://api.openweathermap.org/data/2.5/roadrisk?appid=" + apiKey;
    
    fetch(apiEndpointRoadCondition)
    .then(function(response) {
        return response.json();
    });
}

getParams();