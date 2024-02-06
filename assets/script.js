var longitude;
var latitude;
var apiKeyOW = "116b45a117c031423a95336301ac4350";
var apiKeyTT = "MEJtiG9BcewPsAMQr2nPUpuYTEeThwmY";
var days = document.querySelectorAll('.day');
var currentDate = dayjs();
var startOfWeek = currentDate.startOf('week');

function updateDates() {
    days.forEach(function(day, index) {
        var dayHeader = day.querySelector('.day-header');
        var dateElement = document.createElement('div');
        dateElement.classList.add ('date');
        var date = startOfWeek.add(index, 'day').format('dddd MMMM DD, YYYY');

        dateElement.textContent = date;
        dayHeader.appendChild(dateElement);
    });
}

updateDates();

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
        for (var i = 2; i < 6; i++) {
            printResults(response.list[i]);
        }
        for (var i = 10; i < 14; i++) {
            printResults(response.list[i]);
        }
        for (var i = 18; i < 22; i++) {
            printResults(response.list[i]);
        }
        for (var i = 26; i < 30; i++) {
            printResults(response.list[i]);
        }
        for (var i = 34; i < 38; i++) {
            printResults(response.list[i]);
        }
    })
}

function printResults(resultObj) {
    var cardDate = resultObj.dt_txt.split(' ')[0];
    
    days.forEach(function(day, index) {
      var weatherContainer = day.querySelector('.weather-box');
      var currentDate = startOfWeek.add(index, 'day').format('YYYY-MM-DD');
      
      if (cardDate === currentDate) {
        var weatherCard = document.createElement('div');
        weatherCard.classList.add('card');
        
        var weatherBody = document.createElement('div');
        weatherBody.classList.add('card-body');
        
        var cardDateElement = document.createElement('h4');
        cardDateElement.classList.add('card-date');
        cardDateElement.textContent = resultObj.dt_txt;
        
        var weatherIcon = resultObj.weather[0].icon;
        var iconUrl = getWeatherIcon(weatherIcon);
        
        var iconImg = document.createElement('img');
        iconImg.src = iconUrl;
        
        var temp = document.createElement('div');
        temp.textContent = "Temperature: " + resultObj.main.temp + "\u00B0 F";
        
        var clouds = document.createElement('div');
        clouds.textContent = "Clouds: " + resultObj.clouds.all + "% cloud coverage.";
        
        var windSpeed = document.createElement('div');
        windSpeed.textContent = 'Wind: ' + resultObj.wind.speed + ' mph';
        
        weatherBody.append(cardDateElement);
        weatherBody.append(iconImg);
        weatherBody.append(temp);
        weatherBody.append(clouds);
        weatherBody.append(windSpeed);
        weatherCard.append(weatherBody);
        weatherContainer.appendChild(weatherCard);
      }
    });
  }

function getWeatherIcon (weatherIcon) {
    var icon = 'https://openweathermap.org/img/wn/' + weatherIcon + "@2x.png";
    return icon;
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
    .then(function(response) {
        console.log(response);
        resultsTraffic(response);
        
    });
}

function resultsTraffic(data) {
    
    var trafficCard = document.createElement('div');
    trafficCard.classList.add('card');

    var trafficBody = document.createElement('div');
    trafficBody.classList.add('card-body');

    var trafficSpeed = document.createElement('div');
    trafficSpeed.textContent = "Current Traffic Speed: " + data.currentSpeed + "mph.";

    var roadClosed = document.createElement('div');
    if (data.roadClosure = true) {
        roadClosed.textContent = "There is currently road closures in your area.";
    } else {
        roadClosed.textContent = "There are currently no road closures in your area.";
    }
    
    trafficBody.append(trafficSpeed);
    trafficBody.append(roadClosed);
}

getParams();