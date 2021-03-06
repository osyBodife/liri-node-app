var moment = require('moment');
moment().format();
require("dotenv").config();
var keys = require("./keys.js");

//initialize the variables to use
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

//console.log(process.argv);
let action = process.argv[2];
//from the process.argv array 
// create an new array starting from 3rd item
//convert to a string
//reomve all the commas
let searchTerm = process.argv.slice(3).toString().replace(/,/g, " ");

console.log(action);
console.log(searchTerm);

var axios = require("axios");



//REQUIRE FILE SYSTEMS
const fs = require("fs");


// OMDB AND BANDS IN TOWN API'S
let omdb = (keys.omdb);
let bandsintown = (keys.bandsintown);


function doThis(searchTerm) {
  // UTILIZE THE BUILT IN READFILE METHOD TO ACCESS RANDOM.TXT
  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    // create an array from the data based the on separator "," using the split()
    let dataArray = data.split(",");
    console.log("Contents of our array :" + dataArray)


    // use the array elements as input parameters for userCommand function
    action = dataArray[0];
    searchTerm = dataArray[1];
    // call the userRequest function
    userRequest(action, searchTerm);
  });
};


//axios.get("https://rest.bandsi}ntown.com/artists/" + searchTerm  + "/events?app_id=" + bandsintown).then(
function getBandsInTown() {
  axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp").then(
    function (response) {
      // If the axios was successful...
      // Then log the body from the site!
      //console.log(response.data);
     console.log("Venue Name : " + response.data[0].venue.name);
     console.log("Location : " + response.data[0].venue.city);
     //console.log(" Date & Time : " + response.data[0].datetime);
     
                    // Use moment.js to format date and time to MM/DD/YYYY
      let concertDate = moment(response.data[0].datetime).format("MM/DD/YYYY hh:00 A");
                    
      console.log("Concert Date & Time : " + concertDate);
      //let bands=  response.data[0]['offers'];
     // console.log(bands)
      


      
    },

    function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

function spotifyThis() {
  console.log(`\n - - - - -\n\nSEARCHING FOR..."${searchTerm}"`);

  // IF USER QUERY NOT FOUND, PASS VALUE OF "ACE OF BASE" 
  if (!searchTerm) {
    searchTerm = "\'The Sign\' by Ace of Base"
  };

  // SEARCH with spotify format

  spotify.search({
    type: 'track',
    query: searchTerm,
    limit: 1
  }, function (error, data) {
    if (error) {
      return console.log('Error occurred: ' + error);
    }
    // COLLECT SELECTED DATA IN AN ARRAY
    let spotifyArray = data.tracks.items;

    for (i = 0; i < spotifyArray.length; i++) {
      console.log(`\n That's for you...\n\nArtist: ${data.tracks.items[i].album.artists[0].name} \nSong: ${data.tracks.items[i].name}\nAlbum: ${data.tracks.items[i].album.name}\nSpotify link: ${data.tracks.items[i].external_urls.spotify}\n\n - - - - -`)
      console.log( "Artist: " + data.tracks.items[0].name)
    };
  });

}




//movie function
///Run the axios.get function...
// The axios.get function takes in a URL and returns a promise (just like $.ajax)
function getMovie() {
  if (!searchTerm) {
    searchTerm = "mr nobody";
};
  axios.get("http://www.omdbapi.com/?i=tt3896198&apikey=bf76ed6a&t=" + searchTerm).then(
    function (response) {
      // If the axios was successful...
      // Then log the body from the site!
      //console.log(response.data);
      console.log(" Movie Title :" + response.data.Title);
      console.log(" Year of Release :" + response.data.Year);
      console.log("The  imdbRating :" + response.data.imdbRating);
      //to get the Rotten Tomatoe Rating
      let rottenTomatoesRating=  response.data.Ratings;
      //console.log(rottenTomatoesRating);
      //console.log(rottenTomatoesRating.length);
      //for (let i=1; i<rottenTomatoesRating.length; i++ ){
        //check if Rotten Tomatoe Rating Exist
        if(rottenTomatoesRating.length<0){
          console.log("The Rotten Tomatoes Rating : " + "Not Available");

        }else{
          console.log("The Rotten Tomatoes Rating : " + rottenTomatoesRating[1]["Value"]);

        }
      
       
        //}     

        
      console.log("The  country of release :" + response.data.Country);
      console.log("The  Language of the movie:" + response.data.Language);
      console.log("The  Plot :" + response.data.Plot);
      console.log("The  Actors :" + response.data.Actors);       

    },
    function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}



// the finally Liri code logic
function userRequest(action, searchTerm) {
  // make a decision based on the command
  switch (action) {
    case "concert-this":
      //concertThis();
      getBandsInTown();
      break;
    case "spotify-this":
      spotifyThis();
      break;
    case "movie-this":
      getMovie();
      break;
    case "do-this":
      doThis(searchTerm);
      break;
    default:
      console.log("I don't understand");
      break;
  }
}

userRequest(action, searchTerm);