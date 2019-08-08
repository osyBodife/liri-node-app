// require .env FILE
require("dotenv").config();
const axios = require('axios');

var moment = require('moment');
moment().format();

var keys = require("./keys.js");

//initialize the variables to use
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

// OMDB AND BANDS IN TOWN API'S
let omdb = (keys.omdb);
let bandsintown = (keys.bandsintown);


//console.log(process.argv);
let action =process.argv[2];
//from the process.argv array 
// create an new array starting from 3rd item
//convert to a string
//reomve all the commas
let searchTerm=process.argv.slice(3).toString().replace(/,/g , " ");

console.log(action);
console.log(searchTerm);


function doThis() {
    // UTILIZE THE BUILT IN READFILE METHOD TO ACCESS RANDOM.TXT
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        // create an array from the data based the on separator "," using the split()
        let dataArray = data.split(",");
		console.log ("Contents of our array :" + dataArray)
		

        // use the array elements as input parameters for userCommand function
       action = dataArray[0];
        searchTerm = dataArray[1];
        // call the userCommand function
        userCommand(action, searchTerm);
    });
};
//Send all data requests to:

////http://www.omdbapi.com/?apikey=[yourkey]&
//you can now return all episodes by using just the "Season" parameter: http://www.omdbapi.com/?t=Game of Thrones&Season=1
/*
//let searchTerm = "Game of Thrones&Season";
let queryURL="http://www.omdbapi.com/?i=tt3896198&apikey=bf76ed6a&t=" + searchTerm + "&Season=1";
    //let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=lISwnQ5TdGTfXd9Ex4N17L98lbq6KRRi&limit=10&q=" + searchTerm;
    //make an ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    })// We store all of the retrieved data inside of an object called "response"
        .then(function (response) {
        ls
        console.log(response);
            //store all data from ajax call to a variable
            let results = response.data;
            //alert the user when there no images for current search form giphy.com
            if(results.length===0){
                alert("Sorry there is NO giphy images for your current search")
            }else{
            //loop thru entire results
            for (var i = 0; i < results.length; i++) {
                // create a div where to container each image

            }
        }
    } );

*/
/* movie function
    ///Run the axios.get function...
// The axios.get function takes in a URL and returns a promise (just like $.ajax)
axios.get("http://www.omdbapi.com/?i=tt3896198&apikey=bf76ed6a&t=" + searchTerm ).then(
  function(response) {
    // If the axios was successful...
    // Then log the body from the site!
    console.log(response.data);
  },

  function(error) {
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

*/
//https://rest.bandsintown.com/artists/" + argument + "/events?app_id=codingbootcamp"
    ///Run the axios.get function...
// The axios.get function takes in a URL and returns a promise (just like $.ajax)

//axios.get("https://rest.bandsi}ntown.com/artists/" + searchTerm  + "/events?app_id=" + bandsintown, function (error, response, body) {

//});

axios.get("https://rest.bandsi}ntown.com/artists/" + searchTerm  + "/events?app_id=" + bandsintown).then(
//axios.get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp" ).then(
  function(response) {
    // If the axios was successful...
    // Then log the body from the site!
    //console.log(response.data);
    console.log(response.name);
    //console.log(response.data[0].name);
    //console.log(response.data.offers.venue.name);
  },

  function(error) {
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

  