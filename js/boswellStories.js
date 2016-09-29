'use strict';

// HELP NEEDED:
// I have replaced "audioAssets.js" with this new script (boswellStories.js)
// Rather than rely on staticly-defined list of podcasts, I want to load the URL of specific .wav files from
// a DynamoDB database.  The "docClient.get" code below seems to work perfectly (I can see that from the console.log
// lines, and I know that these are valid .wav files, BUT...
// This may simply be a "closure" Javascript issue that my tiny brain cannot get around, but I cannot properly load
// the array "audioData[]" into the module.exports for this script.  How can I use a dynamoDB call to load data into
// the module.exports for this script?

var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient()

var table = "boswellMemories"; // the name of my dynamoDB database
var boswellUserId = "1967D471-70F6-4BD7-9C03-7FEFB75B3D5F"; // index into dynamoDB database

var params = {
    TableName: table,
    Key: {
        "boswellUserId": boswellUserId
        }
    };


docClient.get(params, function (err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        return callback(err);
    } else {

        var audioData = [];
        audioData[1] =
            {
                'title': data.Item.transcription,
                'url': data.Item.filename
            };

        audioData[2] =
            {
                'title': data.Item.transcription,
                'url': data.Item.filename
            };
 //       console.log("data.Item.filename: ", data.Item.filename); // data is properly loaded from the "data" db call above
        console.log("audioData=", audioData); // displays the correct result when I run this on my console (and on Lambda)

        module.exports = audioData; // this does not seem to work!
        return;
    }
});

// if I put the module.exports = audioData" line here, it tells me it can't find "audioData".  It is presumably
// only available inside the docClient.get function above.  Argh.  Globals?





// -------------------------------------------------------------------------------------
// the OLD way (from the original audioAssets.js)
// this works of course, but it is outside the dynamoDB .get request that I need to make!

//var audioData = [
//    {
//        'title': 'Question 65: Describe an error you made, why you made it, and the impact it had on your life.',
//        'url': 'https://s3.amazonaws.com/boswellapp/1472935087.45316-1967D471-70F6-4BD7-9C03-7FEFB75B3D5F-100065.wav'
//    },
//    {
//        'title': 'Question 79: Have you ever been a whistleblower, exposing something unethical or illegal? If so, describe it.',
//        'url': 'https://s3.amazonaws.com/boswellapp/1472935287.18748-1967D471-70F6-4BD7-9C03-7FEFB75B3D5F-100079.wav'
//    },
//    {
//        'title': 'Question 67: Name one of your favorite books, and explain why it�s a favorite.',
//        'url': 'https://s3.amazonaws.com/boswellapp/1472935334.67451-1967D471-70F6-4BD7-9C03-7FEFB75B3D5F-100067.wav'
//    },
//    {
//        'title': 'Question 73: Have you ever had an accident? Describe it, and what you learned from the experience.',
//        'url': 'https://s3.amazonaws.com/boswellapp/1472935408.81362-1967D471-70F6-4BD7-9C03-7FEFB75B3D5F-100073.wav'
//    },
//    {
//        'title': 'Question 65: Describe an error you made, why you made it, and the impact it had on your life.',
//        'url': 'https://s3.amazonaws.com/boswellapp/1472935087.45316-1967D471-70F6-4BD7-9C03-7FEFB75B3D5F-100065.wav'
//    },
//    {
//        'title': 'Question 79: Have you ever been a whistleblower, exposing something unethical or illegal? If so, describe it.',
//        'url': 'https://s3.amazonaws.com/boswellapp/1472935287.18748-1967D471-70F6-4BD7-9C03-7FEFB75B3D5F-100079.wav'
//    }
//];

//module.exports = audioData;



