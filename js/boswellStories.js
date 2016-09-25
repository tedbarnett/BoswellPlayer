'use strict';

var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient()

var table = "TestTable";

var userId = "1967D471-70F6-4BD7-9C03-7FEFB75B3D5F";
var getItemData = {};
var sayText = "Here is the sayText";

var params = {
    TableName: table,
    Key: {
        "userId": userId
    }
};

var titleText = docClient.get(params, function (err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        sayText = "Oops.  An error when reading from Dynamo DB";
    } else {
 //       console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
        getItemData = JSON.stringify(data, null, 2);
        console.log("The transcription:", data.Item.transcription);
        sayText = "I read the data successfully";
    }
    return sayText;
});

// Data should look like this:
//"Item": {
//    "timestamp_string": "Sat Sep 24 2016 22:00:08 GMT+0000 (UTC)",
//    "length_in_minutes": 0.06869062499999999,
//    "filename": "1474754396.73447-1967D471-70F6-4BD7-9C03-7FEFB75B3D5F-100042.wav",
//    "userlogin": "mail@tedbarnett.com",
//    "transcription": "in addition to being paid money how else is your career create value in your life ",
//    "length": "00:00:04",
//    "username": "Ted Barnett",
//    "question_id": "100042",
//    "timestamp": "1474754396.73447",
//    "userId": "1967D471-70F6-4BD7-9C03-7FEFB75B3D5F"
//}


var fileName = 'https://s3.amazonaws.com/boswellapp/1472935287.18748-1967D471-70F6-4BD7-9C03-7FEFB75B3D5F-100079.wav';

var audioData = [
    {
        'title': titleText,
        'url': fileName
    },
    {
        'title': titleText,
        'url': fileName
    }
];

module.exports = audioData;