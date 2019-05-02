$(document).ready(function () {

  //queryURL
  // var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=Hs5mRXXWOg1wyGYRQsUNEegIcLGW3812";
  // "https://app.ticketmaster.com/discovery/v2/events.json?stateCode=CO&apikey=Hs5mRXXWOg1wyGYRQsUNEegIcLGW3812" //
  //  var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
  //  "q=" + userSearch + ",Burundi&units=imperial&appid=67bc031d2f43613da054c1c50d4ec84b";

  // var queryURLtm = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + userSearch + 
  // "&apikey=Hs5mRXXWOg1wyGYRQsUNEegIcLGW3812";

  // var queryURLz =  "https://developers.zomato.com/api/v2.1/cities?q=" + search + 
  // "&apikey=9ff7290016f630d99b4d58d9a605925b";

  var search = '';

  function displayTicketMaster() {
    event.preventDefault();

    search = $("#search").val();
    var queryURLtm = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + search + "&apikey=Hs5mRXXWOg1wyGYRQsUNEegIcLGW3812";

    $.ajax({
      url: queryURLtm,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      console.log(queryURLtm);


    })
  }

  function displayZomato() {
    event.preventDefault();

    search = $("#search").val();
    var queryURLz =  "https://developers.zomato.com/api/v2.1/cities?q=" + search + "&apikey=9ff7290016f630d99b4d58d9a605925b";
    $.ajax({
      url: queryURLz,
      method: "GET"
    }).then(function(response){
      console.log(response);
      console.log(queryURLz);
    })
  }

  function displayWeather() {
    event.preventDefault();

    search = $("#search").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + search + ",us&mode=xml&appid=67bc031d2f43613da054c1c50d4ec84b";
    // var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + search + ",Burundi&units=imperial&appid=67bc031d2f43613da054c1c50d4ec84b";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){
      console.log(response);
      console.log(queryURL);
      // $(".city").html("<h1>" + response.name + " Weather Details</h1>");
      $(".wind").text("Wind Speed: " + response);
      // $(".humidity").text("Humidity: " + response.main.humidity);
      // $(".temp").text("Temperature (F) " + response.main.temp);
    })
  }

  $("#run-search").on("click", function() {
    displayTicketMaster();
    displayZomato();
    displayWeather();
  });




});