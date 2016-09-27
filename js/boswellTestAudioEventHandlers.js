'use strict';

var Alexa = require('alexa-sdk');
var audioData = require('./boswellStories'); // was audioAssets
var constants = require('./constants');

console.log('audioData: ', audioData);

function getToken() {
    // Extracting token received in the request.
    return this.event.request.token;
}

function getIndex() {
    // Extracting index from the token received in the request.
    var tokenValue = parseInt(this.event.request.token);
    return this.attributes['playOrder'].indexOf(tokenValue);
}

function getOffsetInMilliseconds() {
    // Extracting offsetInMilliseconds received in the request.
    return this.event.request.offsetInMilliseconds;
}