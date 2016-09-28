'use strict';

var Alexa = require('alexa-sdk');
var constants = require('./constants');

var getAudioData = require('./boswellStories')

exports.handler = function (event, context, callback) {
    getAudioData(function () {
        var stateHandlers = require('./stateHandlers');
        var audioEventHandlers = require('./audioEventHandlers');
        var alexa = Alexa.handler(event, context);
        alexa.appId = constants.appId;
        alexa.dynamoDBTableName = constants.dynamoDBTableName;
        alexa.registerHandlers(
            stateHandlers.startModeIntentHandlers,
            stateHandlers.playModeIntentHandlers,
            stateHandlers.remoteControllerHandlers,
            stateHandlers.resumeDecisionModeIntentHandlers,
            audioEventHandlers
        );

        var audioPlayerInterface = ((((event.context || {}).System || {}).device || {}).supportedInterfaces || {}).AudioPlayer;
        if (audioPlayerInterface === undefined) {
            alexa.emit(':tell', 'Sorry, this skill is not supported on this device');
        }
        else {
            alexa.execute()
        }
    })

};
