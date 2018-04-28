require("dotenv").config();
var keysFile = require("./keys.js");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var fs = require('fs');

var twitterClient = new Twitter(keysFile.twitter);
var spotifyClient = new Spotify(keysFile.spotify);
var cmdLiri = '';
var songOrmovie = '';
var outputText = '';


function displayTweets() {

  twitterClient.get('favorites/list', function (err, tweets, response) {
    if (!err) {
      for (var i = 0; i < tweets.length; i++) {
        console.log('(' + (i + 1) + '): ' + tweets[i].text);
        outputText += '(' + (i + 1) + '): ' + tweets[i].text + '\n';
      }
      console.log('*******************************************' + '\n');
      
    } else {
      console.log("Error: Unable to retrieve Tweets");
      outputText += 'Error: Unable to retrieve Tweets!!';
    }
    copyToLog(outputText);
  });
}

function displaySongInfo(songName) {
  
  spotifyClient.search({
      type: 'track',
      query: songName,
      limit: 1
    })
    .then(function (response) {
      console.log('Song Name: ' + response.tracks.items[0].name);
      outputText += 'Song Name: ' + response.tracks.items[0].name + '\n';
      console.log('Album Name: ' + response.tracks.items[0].album.name);
      outputText += 'Album Name: ' + response.tracks.items[0].album.name + '\n';
      console.log('Preview URL: ' + response.tracks.items[0].preview_url);
      outputText += 'Preview URL: ' + response.tracks.items[0].preview_url + '\n';
      var artist = '';
      for (var j = 0; j < response.tracks.items[0].artists.length; j++)
        artist += response.tracks.items[0].artists[j].name + ' ';
      console.log('Artists: ' + artist);
      outputText += 'Artists: ' + artist + '\n';
      console.log('*******************************************' + '\n');
      copyToLog(outputText);
    }).catch(function (err) {
      console.log("Error: Song not Found!!");
      outputText += 'Error: Song Not Found!!';
      copyToLog(outputText);
    });
    

}

function displayMovieInfo(movieName) {
  var qStr = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=trilogy';
 
  request(qStr, function (err, response, body) {

    if (err === null && JSON.parse(body).Title !== undefined && JSON.parse(body).Title !== null) {
      // Title of the movie.
      console.log('Movie Title: ' + JSON.parse(body).Title);
      outputText += 'Movie Title: ' + JSON.parse(body).Title + '\n';
      // * Year the movie came out.
      console.log("Year Released: " + JSON.parse(body).Year);
      outputText += "Year Released: " + JSON.parse(body).Year + '\n';
      // * IMDB Rating of the movie.
      console.log('IMDB Rating: ' + JSON.parse(body).imdbRating);
      outputText += 'IMDB Rating: ' + JSON.parse(body).imdbRating + '\n';

      // * Rotten Tomatoes Rating of the movie.
      for (var i = 0; i < JSON.parse(body).Ratings.length; i++) {
        if (JSON.parse(body).Ratings[i].Source === 'Rotten Tomatoes') {
          console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[i].Value);
          outputText += 'Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[i].Value + '\n';
        }
      }

      // * Country where the movie was produced.
      console.log('Country: ' + JSON.parse(body).Country);
      outputText += 'Country: ' + JSON.parse(body).Country + '\n';
      // * Language of the movie.
      console.log('Language: ' + JSON.parse(body).Language);
      outputText += 'Language: ' + JSON.parse(body).Language + '\n';
      // * Plot of the movie.
      console.log('Plot: ' + JSON.parse(body).Plot);
      outputText += 'Plot: ' + JSON.parse(body).Plot + '\n';
      // * Actors in the movie.
      console.log('Actors: ' + JSON.parse(body).Actors);
      outputText += 'Actors: ' + JSON.parse(body).Actors + '\n';
    } else {
      console.log("Error: Movie not found!!");
      outputText += 'Error: Movie not found!!' + '\n';
      // console.log(err);
    }
    console.log('*******************************************' + '\n');
    // console.log(outputText);
    copyToLog(outputText);
  });

}

function defaultVal(commandText) {
  switch (commandText) {
    case 'spotify-this-song':
      songOrmovie = 'the,song';
      break;
    case 'movie-this':
      songOrmovie = 'Mr,Nobody';
      break;
  }
}

function copyToLog(textVal) {
  textVal += '\n' + '*********************************************************' + '\n';
  fs.appendFile('./log.txt', textVal, 'utf8', function (err) {
    if (err)
      throw err;
    console.log('Appended to Log successfully!!!!');
  });
}

function executeCmd() {
  switch (cmdLiri) {
    case null:
    case undefined:
      console.log('No Command Entered!!');
      break;
    case 'my-tweets':
      displayTweets();
      break;
    case 'spotify-this-song':
      displaySongInfo(songOrmovie.replace(/,/g, ' '));
      break;
    case 'movie-this':
      displayMovieInfo(songOrmovie.replace(/,/g, '+'));
      break;
    default:
      console.log('I do not understand your command!!');
      console.log('Use my-tweets or spotify-this-song or movie-this');
      outputText += 'I do not understand your command!!' + '\n' +
        'Use my-tweets or spotify-this-song or movie-this';
      copyToLog(outputText);

  }
}


if (process.argv[2] === 'do-what-it-says') {
  fs.readFile('./random.txt', 'utf8', function (err, data) {

    var dataArray = data.trim().split(' ');
    cmdLiri = dataArray[0];
    if (dataArray.length > 1) {
      songOrmovie = dataArray.slice(1).toString();
      outputText += 'node liri.js ' + cmdLiri + ' ' + songOrmovie + '\n';
    } else {
      outputText += 'node liri.js ' + cmdLiri + '\n';
      defaultVal(cmdLiri);
    }
    executeCmd();
  });
} else {
  cmdLiri = process.argv[2];
  if (process.argv.length > 3) {
    songOrmovie = process.argv.slice(3).toString() + '\n';
    outputText += 'node liri.js ' + cmdLiri + ' ' + songOrmovie + '\n';
  } else if (process.argv.length === 3) {
    outputText += 'node liri.js ' + cmdLiri + '\n';
    defaultVal(cmdLiri);
  }
  executeCmd();
}