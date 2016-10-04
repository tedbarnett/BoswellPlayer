'use strict';

// TO DO
// Don't let podcasts loop over and over (play most recent to least and then stop)
// Always play the question title
// aws dynamodb batch-write-item --request-items file://boswell_questions_for_dynamoDB_import.json
// Here's a node app that loads data into a dynamoDB database: http://stackoverflow.com/questions/32678325/how-to-import-bulk-data-from-csv-to-dynamodb
// Finish adding the questions to boswellMemories dynamoDB (manually!)
// Store the boswellUserId in the boswellAttributes database so we can look it up easily based on AmazonID?

var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient()

var table = "boswellMemories"; // the name of my dynamoDB database
//var boswellUserId = "EA51A89D-792B-4C20-9870-AC4D31C4D51F"; // Jeff Perrone BoswellUserId
var boswellUserId = "18FE13AA-D5DB-4AA3-AFBE-4C1A0207AD91"; // Ted Barnett BoswellUserId

var params = {
    TableName: table,
    Key: {
        "boswellUserId": boswellUserId
        }
    };

module.exports = function getBoswellStories(callback) {
      var stories = [];
      docClient.get(params, function (err, data) {
        // stories.push({})  // do this for each story in the data response
        var questionNumber = data.Item.question_id.substring(4, 6);
        console.log("data.Item.question_id =  ", data.Item.question_id);
        console.log("questionNumber =  ", questionNumber);
        console.log("data.Item.filename =  ", "https://s3.amazonaws.com/boswellapp/" + data.Item.filename);
        stories.push({
            'title': "Question number " + questionNumber,
            'url': "https://s3.amazonaws.com/boswellapp/" + data.Item.filename,
            'transcription': data.Item.transcription,
            'username': data.Item.username
        });
        // stories.push({
        //     'title': "Question number " + questionNumber,
        //     'url': "https://s3.amazonaws.com/boswellapp/" + data.Item.filename
        // });
        // stories.push({
        //     'title': "Question number " + questionNumber,
        //     'url': "https://s3.amazonaws.com/boswellapp/" + data.Item.filename
        // });
        console.log("data = ", data);
        callback(err, stories);
      });
    };
