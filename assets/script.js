//names the latitude and longitude variables
var longitude;
var latitude;
//api  key for Open Weather site
var apiKeyOW = "116b45a117c031423a95336301ac4350";
//api key for TomTom site
var apiKeyTT = "MEJtiG9BcewPsAMQr2nPUpuYTEeThwmY";
//selects all the classes with the day tag
var days = document.querySelectorAll('.day');
//gets the current date in Dayjs
var currentDate = dayjs();
//lables the current date as the start of the week
var startOfWeek = currentDate.startOf('week');
var taskForm = document.querySelector('.task-form');
var confirmTaskBtn = document.querySelector('#confirm-task');
var tasks = [];
var daySelection;
var daySelection = document.querySelector('#day-selection');
var sunday = document.querySelector('.daily-tasks');
var monday = document.querySelector('.daily-tasks1');
var tuesday = document.querySelector('.daily-tasks2');
var wednesday = document.querySelector('.daily-tasks3');
var thursday = document.querySelector('.daily-tasks4');
var friday = document.querySelector('.daily-tasks5');
var saturday = document.querySelector('.daily-tasks6');

// updates the dates using Dayjs to the current dates an adds styling
function updateDates() {
    days.forEach(function(day, index) {
        var dayHeader = day.querySelector('.day-header');
        var dateElement = document.createElement('div');
        dateElement.style.fontWeight = 'bold';
        dateElement.classList.add ('date');
        var date = startOfWeek.add(index, 'day').format('dddd MMMM DD, YYYY');

        dateElement.textContent = date;
        dayHeader.appendChild(dateElement);
    });
}

updateDates();

//getting city name from Open Weather url
function getParams() {
    var searchParameters = document.location.search.split('=');
    var cityName = searchParameters[1];
    getLocation(cityName);
}

//uses Open Weather api to get the name of a city inputed and return the latitude and longitude
getLocation = function (cityName) {
    var apiEndpointLocation = 
    "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=" + apiKeyOW;


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

//uses the Open Weather api to get the weather and display it as a console log
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

//gets the data from the getWeather function and displays it on the correct days
function printResults(resultObj) {
    var cardDate = resultObj.dt_txt.split(' ')[0];
    
    days.forEach(function(day, index) {
      var weatherContainer = day.querySelector('.weather-box');
      var currentDate = startOfWeek.add(index, 'day').format('YYYY-MM-DD');
      
      if (cardDate === currentDate) {
        var weatherCard = document.createElement('div');
        weatherCard.classList.add('card');
        
        var weatherBody = document.createElement('div');
        weatherBody.setAttribute('style', 'background-color: #c8c7ed');
        weatherBody.classList.add('card-body');
        
        var cardDateElement = document.createElement('h4');
        cardDateElement.classList.add('card-date');
        cardDateElement.textContent = resultObj.dt_txt;
        
        var weatherIcon = resultObj.weather[0].icon;
        var iconUrl = getWeatherIcon(weatherIcon);
        
        var iconImg = document.createElement('img');
        iconImg.src = iconUrl;

        var rain = document.createElement('div');
        rain.textContent = "Chance of rain: " + resultObj.pop*100 + "%";
        
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
        weatherBody.append(rain);
        weatherBody.append(windSpeed);
        
        weatherCard.append(weatherBody);
        weatherContainer.appendChild(weatherCard);
      }
    });
  }

//gets appropriate weather icon from Open Weather
function getWeatherIcon (weatherIcon) {
    var icon = 'https://openweathermap.org/img/wn/' + weatherIcon + "@2x.png";
    return icon;
}

//gets the traffic conditions from TomTom api displays as a console log
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


// takes the data from the getTrafficConditions function and displays the data on the html page in the current day
function resultsTraffic(data) {
    var trafficContainer = document.querySelectorAll('.road-conditions');

    var trafficCard = document.createElement('div');
    trafficCard.classList.add('card');

    var trafficBody = document.createElement('div');
    trafficBody.setAttribute("style", "background-color: #bcfdd0; font-weight: bold");
    trafficBody.classList.add('card-body');

    var trafficSpeed = document.createElement('div');
    trafficSpeed.textContent = "Current Traffic Speed: " + data.flowSegmentData.currentSpeed + "mph.";

    var roadClosed = document.createElement('div');
    if (data.flowSegmentData.roadClosure = true) {
        roadClosed.textContent = "There is currently road closures in your area.";
        roadClosed.style.textDecoration = "underline";
        roadClosed.style.color = "red";
    } else {
        roadClosed.textContent = "There are currently no road closures in your area.";
        roadClosed.style.textDecoration = "underline";
        roadClosed.style.color = "#006421";
    }
    
    
    trafficBody.append(trafficSpeed);
    trafficBody.append(roadClosed);
    trafficCard.append(trafficBody);
    trafficContainer[currentDate.day()].appendChild(trafficCard);

}

function pushTask(event) {
    event.preventDefault();

    var taskInput = document.querySelector('#task-input').value;
    var daySelection = document.querySelector('#day-selection').value;
    var taskContainer = document.createElement('ul');
    taskContainer.setAttribute('style', 'text-align: center');
    taskContainer.value = taskInput;
    taskContainer.append(taskInput);

    storeTasks(taskInput, daySelection);
    
    if (taskInput === '') {
        return;
    }

    if (daySelection === 'Sunday') {
        sunday.appendChild(taskContainer);
    } else if (daySelection === 'Monday') {
        monday.appendChild(taskContainer);
    } else if (daySelection === 'Tuesday') {
        tuesday.appendChild(taskContainer);
    } else if (daySelection === 'Wednesday') {
        wednesday.appendChild(taskContainer);
    } else if (daySelection === 'Thursday') {
        thursday.appendChild(taskContainer);
    } else if (daySelection === 'Friday') {
        friday.appendChild(taskContainer);
    } else {
        saturday.appendChild(taskContainer);
    }
}

function storeTasks(taskInput, daySelection) {
    var storedTasks = JSON.parse(localStorage.getItem('tasks')) || {};
    storedTasks.taskInput = taskInput;
    storedTasks.daySelection = daySelection;
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}
  
function getTasks() {
    var storedTasks = JSON.parse(localStorage.getItem('tasks'));
  
    if (storedTasks !== null) {
        pushTask(storedTasks.taskInput, storedTasks.daySelection);
    }
}

confirmTaskBtn.addEventListener('click', pushTask);

getParams();