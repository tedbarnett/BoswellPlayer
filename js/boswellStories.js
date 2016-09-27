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
        var ret = data;

        console.log("data.Item.filename: ", data.Item.filename);
        console.log("---");
        //console.log("docClient = ", return);
        var audioData = [];
        audioData[1] =
            {
                'title': "outside works",
                'url': 'https://s3.amazonaws.com/boswellapp/1471976625.4458-EA51A89D-792B-4C20-9870-AC4D31C4D51F-100027.wav'
            };

        audioData[2] =
            {
                'title': '2_' + 'outside works',
                'url': 'https://s3.amazonaws.com/boswellapp/1471976625.4458-EA51A89D-792B-4C20-9870-AC4D31C4D51F-100027.wav'
            };
        module.exports = audioData;
        global.fileName = data.Item.filename;
        console.log("audioData=", audioData);
        console.log("global.fileName = ", global.fileName);
        return;
    }
});






