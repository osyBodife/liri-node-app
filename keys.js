//check if node is working
console.log('this is loaded');

let SPOTIFY_ID= '09b0a9b9b6e049aea77157b9e5434742';
let SPOTIFY_SECRET='638a49456f3842949c56f156b3dbdd9d ';

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

//Client ID 09b0a9b9b6e049aea77157b9e5434742
//Client Secret 638a49456f3842949c56f156b3dbdd9d 
let BANDSINTOWN_ID="codingbootcamp";
exports.bandsintown = {
  id: process.env.BANDSINTOWN_ID
  
};


exports.omdb = {
  id: process.env.OMDB_ID
  
};