'use strict';

// TO DO:
// Enable 2 keys for boswellMemories DB: userLogin and fileName
// Edit /filename Node-RED to write out both keys userLogin and fileName into dynamoDB
// Don't let podcasts loop over and over (play most recent to least and then stop)
// Always play the question title
// aws dynamodb batch-write-item --request-items file://boswell_questions_for_dynamoDB_import.json
// Here's a node app that loads data into a dynamoDB database: http://stackoverflow.com/questions/32678325/how-to-import-bulk-data-from-csv-to-dynamodb
// Finish adding the questions to boswellMemories dynamoDB (manually!)
// Store the boswellUserId in the boswellAttributes database so we can look it up easily based on AmazonID?

var AWS = require("aws-sdk");
var constants = require('./constants');

AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

var docClient = new AWS.DynamoDB.DocumentClient()

var table = constants.memoriesTableName; // the name of the dynamoDB database of stories
var boswellUserId = constants.boswellUserId;

var params = {
    TableName: table,
    Key: {
        "boswellUserId": boswellUserId // THB: Add fileName key, sorted by timestamp
        }
    };

module.exports = function getBoswellStories(callback) {
      var stories = [];
      docClient.get(params, function (err, data) {
        // stories.push({})  // do this for each fileName in the data response
        var questionNumber = data.Item.question_id.substring(4, 6);
        stories.push({
            'title': "Question number " + questionNumber,
            'url': constants.urlPrefixS3 + data.Item.filename,
            'transcription': data.Item.transcription,
            'username': data.Item.username
        });
        callback(err, stories);
      });
    };
