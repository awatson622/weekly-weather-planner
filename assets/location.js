//modal for display page and getting the users city to use with the api's
var enterCityModal=document.querySelector('#myModal');


var cityFormEl = document.querySelector('#city-form');

function handleCityFormSubmit(event) {
  event.preventDefault();

  var cityInputVal = document.querySelector('#city-input').value;


  if (!cityInputVal) {
    console.error('You need to enter a city.');
    return;
  }

  var queryString = './city-results.html?q=' + cityInputVal;

  location.assign(queryString);
}

cityFormEl.addEventListener('submit', handleCityFormSubmit);
