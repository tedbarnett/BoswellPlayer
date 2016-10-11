"use strict";

module.exports = Object.freeze({

    // App-ID for Amazon Alexa Skill (see Developer Portal for appID)
    appId: 'amzn1.ask.skill.52a97ee7-2a04-4b8d-a4d9-066276556645',

    //  DynamoDB Table names
    dynamoDBTableName : 'boswellAttributes',
    memoriesTableName : 'boswellMemories',

    // Other constants
    resumeReprompt : 'You can say YES to resume or NO to start with the most recent interview',
    //boswellUserId : 'EA51A89D-792B-4C20-9870-AC4D31C4D51F', // jPerrone - for testing
    boswellUserId : '18FE13AA-D5DB-4AA3-AFBE-4C1A0207AD91', // tBarnett - for testing
    urlPrefixS3 : 'https://s3.amazonaws.com/boswellapp',


    /*
     *  States:
     *  START_MODE : Welcome state when the audio list has not begun.
     *  PLAY_MODE :  When a playlist is being played. Does not imply only active play.
     *               It remains in the state as long as the playlist is not finished.
     *  RESUME_DECISION_MODE : When a user invokes the skill in PLAY_MODE with a LaunchRequest,
     *                         the skill provides an option to resume from last position, or to start over the playlist.
     */
    states : {
        START_MODE : '',
        PLAY_MODE : '_PLAY_MODE',
        RESUME_DECISION_MODE : '_RESUME_DECISION_MODE'
    }
});
