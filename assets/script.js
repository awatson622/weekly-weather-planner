var longitude;
var latitude;
var apiKey = "116b45a117c031423a95336301ac4350";


getLocation = function () {
    var apiEndpoint = 
    "http://api.openweathermap.org/geo/1.0/direct?q=Davis,CA,US-CA&limit=5&appid=" + apiKey;

    fetch(apiEndpoint)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        longitude = data[0].lon;
        latitude = data[0].lat;
        getWeather(latitude, longitude);
    });
}

function getWeather(latitude, longitude) {
    var weatherCall = 'https://api.openweathermap.org/data/3.0/onecall?lat=' + 
    latitude + '&lon=' + longitude + '&units=imperial';

    fetch(weatherCall)
    .then(function(response) {
        if(!response.ok) {
            throw response.json();
        }

        return response.json();
    })
    .then(function(resp) {
        console.log(resp);
        
    })
}

getLocation();