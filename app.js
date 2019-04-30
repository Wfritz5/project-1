$(document).ready(function() {

    var queryURL = "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=Hs5mRXXWOg1wyGYRQsUNEegIcLGW3812";
   // "https://app.ticketmaster.com/discovery/v2/events.json?stateCode=CO&apikey=Hs5mRXXWOg1wyGYRQsUNEegIcLGW3812" //
      // "https://app.ticketmaster.com/discovery/v2/events.json?city=atlanta&apikey=Hs5mRXXWOg1wyGYRQsUNEegIcLGW3812" //
      //zomato "https://developers.zomato.com/api/v2.1/cities?q=atlanta&apikey=9ff7290016f630d99b4d58d9a605925b" 

    
    $.ajax({
    url: queryURL,
    method: "GET"
    })
    .then(function(response) {
    console.log(queryURL);
    console.log(response);
    var results = response._embedded.events[1].name;
      console.log(results);
      for (var i = 0; i < results.length; i++)
    
    $("#eventLoad").html("<h5>" + response._embedded.events[i].name + "</h5>");
    });
    });
    
    var page = 0;
    
    function getEvents(page) {
    $("#events-panel").show();
    $("#attraction-panel").hide();
    
    if (page < 0) {
    page = 0;
    return;
    }
    if (page > 0) {
    if (page > getEvents.json.page.totalPages-1) {
    page=0;
    }
    }
    
    $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG&size=4&page="+page,
    async:true,
    dataType: "json",
    success: function(json) {
    getEvents.json = json;
    showEvents(json);
    },
    error: function(xhr, status, err) {
    console.log(err);
    }
    });
    }
    
    function showEvents(json) {
    var items = $("#events .list-group-item");
    items.hide();
    var events = json._embedded.events;
    var item = items.first();
    for (var i=0;i<events.length;i++) {
    item.children('.list-group-item-heading').text(events[i].name);
    item.children('.list-group-item-text').text(events[i].dates.start.localDate);
    try {
    item.children(".venue").text(events[i]._embedded.venues[0].name + " in " + events[i]._embedded.venues[0].city.name);
    } catch (err) {
    console.log(err);
    }
    item.show();
    item.off("click");
    item.click(events[i], function(eventObject) {
    console.log(eventObject.data);
    try {
    getAttraction(eventObject.data._embedded.attractions[0].id);
    } catch (err) {
    console.log(err);
    }
    });
    item=item.next();
    }
    }
    
    $("#prev").click(function() {
    getEvents(--page);
    });
    
    $("#next").click(function() {
    getEvents(++page);
    });
    
    function getAttraction(id) {
    $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/attractions/"+id+".json?apikey=5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG",
    async:true,
    dataType: "json",
    success: function(json) {
    showAttraction(json);
    },
    error: function(xhr, status, err) {
    console.log(err);
    }
    });
    }
    
    function showAttraction(json) {
    $("#events-panel").hide();
    $("#attraction-panel").show();
    
    $("#attraction-panel").click(function() {
    getEvents(page);
    });
    
    $("#attraction .list-group-item-heading").first().text(json.name);
    $("#attraction img").first().attr('src',json.images[0].url);
    $("#classification").text(json.classifications[0].segment.name + " - " + json.classifications[0].genre.name + " - " + json.classifications[0].subGenre.name);
    }
    
    getEvents(page);
    
    // event.preventDefault();
    
    
    //ticketmaster
    
    //  api key for ticketmaster
    //  "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=Hs5mRXXWOg1wyGYRQsUNEegIcLGW3812"
    
    
    // skyscanner
    
    // "http://partners.api.skyscanner.net/apiservices/browsequotes/v1.0/US/USD/en-US/Denver/Phoenix/2019-05-01/2019-05-10/?apiKey=5e598ceeefmsh2fbb1e4451a4c0bp141930jsnf02e42c59bc1"
    //   {originPlace}/
    //   {destinationPlace}/
    //   {outboundPartialDate}/
    //   {inboundPartialDate}?
    //   apiKey={apiKey}
    
    // This is our API key
    var APIKey = "67bc031d2f43613da054c1c50d4ec84b";
    
    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "q=atlanta,Burundi&units=imperial&appid=" + APIKey;
    
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
    url: queryURL,
    method: "GET"
    })
    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
    
      // Log the queryURL
      console.log(queryURL);
    
      // Log the resulting object
      console.log(response);
    
      // Transfer content to HTML
      $(".city").html("<h1>" + response.name + " Weather Details</h1>");
      $(".wind").text("Wind Speed: " + response.wind.speed);
      $(".humidity").text("Humidity: " + response.main.humidity);
      $(".temp").text("Temperature (F) " + response.main.temp);
    
      // Log the data in the console as well
      console.log("Wind Speed: " + response.wind.speed);
      console.log("Humidity: " + response.main.humidity);
      console.log("Temperature (F): " + response.main.temp);
    });

    