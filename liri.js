var fs = require("fs");
var action = process.argv[2];
var userInput = process.argv[3];

function switchNow (action, userInput) {
// The switch-case will direct which function gets run.
	switch (action) {
	  case "my-tweets":
	    readTweets();
	    break;

	  case "spotify-this-song":
	    spotifySong(userInput);
	    break;

    case "movie-this":
      movie(userInput);
      break;

    case "do-what-it-says":
      whatItSays();
      break;
	}
}

//================= TWITTER REQUEST ================//

	function readTweets(){
	// var twitterKeys =;
	var Twitter = require('twitter');
	// Grabs the twitter keys from keys.js 
	var twitterKeys = require('./keys.js');

  var client = new Twitter ({
 	consumer_key: twitterKeys.twitterKeys.consumer_key,
 	consumer_secret: twitterKeys.twitterKeys.consumer_secret,
  	access_token_key: twitterKeys.twitterKeys.access_token_key,
  	access_token_secret: twitterKeys.twitterKeys.access_token_secret,
  });

  var params = {screen_name: 'Nadirahlinaa'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].text);
        console.log(tweets[i].created_at);
      }
    }
    else {
      console.log(error);
    }
  });
}

//================= SPOTIFY REQUEST ================//

	var songSearch = "";
	//* `spotify-this-song`
	function spotifySong (userInput) {
  	var Spotify = require('node-spotify-api');
  	// Grabs the spotify keys from keys.js
  	var spotifyKeys = require("./keys.js");

  var spotify = new Spotify({
    id: spotifyKeys.spotifyKeys.id,
    secret: spotifyKeys.spotifyKeys.secret
  });

  var nodeArgs = process.argv[2];
  
	// pulls the user input and adds a + between the words
  	for (var i = 3; i < nodeArgs.length; i++) {

  	if (i > 3 && i < nodeArgs.length) {
    songSearch = songSearch + " " + nodeArgs[i];
    }
    else {
      songSearch += nodeArgs[i];
       	 }
  	}
  	// song search if there is no user input

	   spotify.search({ type: 'track', query: userInput }, function(err, data) {
  	 if (err) {
     return console.log('Error occurred: ' + err);
     return console.log('Error occurred: ' + err);
      }
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Song Name: " + data.tracks.items[0].name);
      console.log("Album: " + data.tracks.items[0].album.name);
      console.log("Preview Link: " + data.tracks.items[0].preview_url);
      });
    }


//================= OMDB REQUEST ================//

    function movie(movieName) {
    // Requiring the request package
    var request = require('request');

    // Define the variable movieName
    console.log('movieName',movieName);

    request("http://www.omdbapi.com/?apikey=trilogy&t="+ movieName, function (error, response, body) {
    if (error) {
    console.log(error)
    } else{
    var data = JSON.parse(body)
    console.log ('Title of the movie' + data.Title) 
    console.log ('Year the movie came out' + data.Year)
    console.log ('IMDB Rating of the movie' + data.IMDBrating)
    console.log ('Rotten Tomatoes Rating of the movie' + data.Ratings[1].Value)
    console.log ('Country where the movie was produced' + data.Country)
    console.log ('Language of the movie' + data.Language)
    console.log ('Plot of the movie' + data.Plot)
    console.log ('Actors in the movie' + data.Actors) 
  }
});
}

    //================= OMDB REQUEST ================// 
    function whatItSays (){
    fs.readFile("random.txt", "utf8", function(error, data) {
    var dataarray = data.split(',');
    switchNow(dataarray[0],dataarray[1])
});
}
 
    switchNow (action, userInput)