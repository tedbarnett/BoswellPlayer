'use strict';

var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient()

var table = "TestTable";
var userId = "1967D471-70F6-4BD7-9C03-7FEFB75B3D5F"; // Ted Barnett's latest recording

var params = {
    TableName: table,
    Key: {
        "userId": userId
        }
    };


docClient.get(params, function (err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        return callback(err);
    } else {
        //getItemData = JSON.stringify(data, null, 2);
        ret = data;
        callback(null, ret);
    }
});


var fileName = result.Item.filename;
var transcription = result.Item.transcription;
console.log("result = ", result);
console.log("---");
console.log("insideAudioData = ", insideAudioData);

audioData = [];
audioData[1] =
    {
        'title': "outside works",
        'url': fileName
    };

audioData[2] =
    {
        'title': '2_' + "outside works,
        'url': fileName
    };
module.exports = audioData;
