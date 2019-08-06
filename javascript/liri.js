// require .env FILE
require("dotenv").config();


var keys = require("./keys.js");








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
        userInput = dataArray[0];
        userQuery = dataArray[1];
        // call the userCommand function
        userCommand(userInput, userQuery);
    });
};