var longitude;
var latitude;
var apiKeyOW = "116b45a117c031423a95336301ac4350";
var apiKeyTT = "MEJtiG9BcewPsAMQr2nPUpuYTEeThwmY";
var weatherEl = document.querySelector('#weather-forecast');



function getParams() {
    var searchParameters = document.location.search.split('=');
    var cityName = searchParameters[1];
    getLocation(cityName);
}


getLocation = function (cityName) {
    var apiEndpointLocation = 
    "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=" + apiKeyOW;


    fetch(apiEndpointLocation)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        longitude = data[0].lon;
        latitude = data[0].lat;
        getWeather(latitude, longitude);
        getTrafficCondition(latitude, longitude);
    });
}

function getWeather(latitude, longitude) {
    var weatherCall = 'https://api.openweathermap.org/data/2.5/forecast?lat='
    + latitude + '&lon=' + longitude + '&appid=' + apiKeyOW + '&units=imperial';

    fetch(weatherCall)
    .then(function(response) {
        if(!response.ok) {
            throw response.json();
        }

        return response.json();
    })
    .then(function(response) {
        console.log(response.list);
        for (var i = 3; i < response.list.length; i += 8) {
            printResults(response.list[i]);
        }
        
    })
}

function printResults(resultObj) {
    var weatherCard = document.createElement('div');
    weatherCard.classList.add('card');

    var weatherBody = document.createElement('div');
    weatherBody.classList.add('card-body');

    var cardDate = document.createElement('h4');
    cardDate.classList.add('card-date');
    var date = resultObj.dt_txt;
    date = date.split(' ').shift();
    cardDate.textContent = date;

    var temp = document.createElement('div');
    temp.textContent = "Temperature: " + resultObj.main.temp + "\u00B0 F";   

    var humidity = document.createElement('div');
    humidity.textContent = 'Humidity: ' + resultObj.main.humidity + "%";    

    var windSpeed = document.createElement('div');
    windSpeed.textContent = 'Wind: ' + resultObj.wind.speed + ' mph';  

    weatherBody.append(cardDate);
    weatherBody.append(temp);
    weatherBody.append(humidity);
    weatherBody.append(windSpeed);
    weatherCard.append(weatherBody);
    weatherEl.append(weatherCard);
}

function getTrafficCondition(latitude, longitude) {
    var roadConditions = "https://api.tomtom.com/traffic/services/4/flowSegmentData/relative0/8/json?key=" + apiKeyTT + "&point=" 
    + latitude + "," + longitude + "&unit=mph&thickness=10&openLr=false&jsonp=jsonp";

    fetch(roadConditions)
    .then(function(response) {
        if(!response.ok) {
            throw response.json();
        }

        return response.json();
    })
    .then(function(data) {
        console.log(data); 
    });
}


getParams();