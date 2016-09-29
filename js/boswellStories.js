'use strict';

var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient()

var table = "boswellMemories";
var boswellUserId = "1967D471-70F6-4BD7-9C03-7FEFB75B3D5F"; // Look for Ted Barnett's latest recording.  Later replace this with friends list.


var params = {
    TableName: table,
    Key: {
        "boswellUserId": boswellUserId
        }
    };

module.exports = function (callback) {
    docClient.get(params, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            return callback(err);
        } else {
            console.log("*** I am INSIDE the docClient.get call...");
            //getItemData = JSON.stringify(data, null, 2);
            var ret = data;
            var audioData = [];
            audioData.push(
                {
                    'title': "title 1",
                    'url': 'https://s3.amazonaws.com/boswellapp/1471976625.4458-EA51A89D-792B-4C20-9870-AC4D31C4D51F-100027.wav'
                }
            );
            audioData.push(
                {
                    'title': "title 2",
                    'url': 'https://s3.amazonaws.com/boswellapp/1471976625.4458-EA51A89D-792B-4C20-9870-AC4D31C4D51F-100027.wav'
                }
            );
            fs.writeFile('/tmp/audio-data.js', 'module.exports = ' + audioData, function(err) {
                console.log(err);
                callback();
            })
          }
    });
    // help from jontewks@gmail.com

    console.log("---");
    console.log("*** I am OUTSIDE the docClient.get call...");
//    console.log("audioData=", audioData);

}


//// the OLD way:

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
