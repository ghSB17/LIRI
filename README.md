# Liri

## Overview

Liri is like iPhone's Siri. However, while Siri is a Speech Interpretation and Recognition Interface, Liri is a _Language_ Interpretation and Recognition Interface. Liri will be a command line node app that takes in parameters and gives the user back data.

## Description

Below are the list of commands that liri is able to respond to:
1. `node liri.js my-tweets`
   * This will show the user's last 20 tweets and when they were created at in their terminal/bash window.

2. `node liri.js spotify-this-song '<song name here>'`
   * This will show the following information about the song in the terminal/bash window
     * Artist(s)
     * The song's name
     * A preview link of the song from Spotify   
     * The album that the song is from
   * If no song is provided then the program defaults to "The Sign" by Ace of Base.
     
3. `node liri.js movie-this '<movie name here>'`
   * This will output the following information to the terminal/bash window:
     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```
   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'  

4. `node liri.js do-what-it-says`
  * LIRI takes the text inside of random.txt and then use it to call one of LIRI's commands. 
  
All the data for the commands that run will be appended to a the text file called `log.txt`.

## Technologies used:

* JavaScript
* Node.js

## How to use the application:

The user is expected to install 
[Node.js Ver8.9.4](https://nodejs.org)

`Clone liri` on user machine.

Run `npm install` to install dependency modules.

Update `.env` with user Twitter and Spotify API Keys.

Now **' Liri '** is ready to execute user commands.
