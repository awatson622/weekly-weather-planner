getLocation = function () {
    var apiEndpoint = 
    "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + ",CA,US-CA&limit=5&appid=116b45a117c031423a95336301ac4350";

    fetch(apiEndpoint)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data)
    });
}

getLocation();