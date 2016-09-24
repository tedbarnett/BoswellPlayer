'use strict';

var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient()

var table = "TestTable";

var userId = "1967D471-70F6-4BD7-9C03-7FEFB75B3D5F";

var params = {
    TableName: table,
    Key: {
        "userId": userId
    }
};

docClient.get(params, function (err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        titleText = "Oops.  An error when reading from Dynamo DB";
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
        titleText = "I read the data successfully";
    }
});

var fileName = 'https://s3.amazonaws.com/boswellapp/1472935287.18748-1967D471-70F6-4BD7-9C03-7FEFB75B3D5F-100079.wav';

var audioData = [
    {
        'title': titleText,
        'url': filename
    },
    {
        'title': titleText,
        'url': filename
    }
];

module.exports = audioData;