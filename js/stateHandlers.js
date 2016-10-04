'use strict';

var Alexa = require('alexa-sdk');
var audioData = require('./boswellStories');
var constants = require('./constants');

var stateHandlers = {
    startModeIntentHandlers : Alexa.CreateStateHandler(constants.states.START_MODE, {
        /*
         *  All Intent Handlers for state : START_MODE
         */
        'LaunchRequest' : function () {
          let _this = this;
            audioData(function(err, list) {  // Added per Mike Reinstein
              // Initialize Attributes
              _this.attributes['playOrder'] = Array.apply(null, {length: list.length}).map(Number.call, Number);
              _this.attributes['index'] = 0;
              _this.attributes['offsetInMilliseconds'] = 0;
              _this.attributes['loop'] = false;
              _this.attributes['shuffle'] = false;
              _this.attributes['playbackIndexChanged'] = true;
              //  Change state to START_MODE
              _this.handler.state = constants.states.START_MODE;

              var message = 'Welcome to Boswell Memories. You can say, playback, to begin listening to recorded interviews.';
              var reprompt = 'You can say, playback the interview, to begin.';

              _this.response.speak(message).listen(reprompt);
              _this.emit(':responseReady');
          });
        },
        'PlayAudio' : function () {
          let _this = this;
            audioData(function(err, list) {  // Added per Mike Reinstein
              if (!_this.attributes['playOrder']) {
                  // Initialize Attributes if undefined.
                  _this.attributes['playOrder'] = Array.apply(null, {length: list.length}).map(Number.call, Number);
                  _this.attributes['index'] = 0;
                  _this.attributes['offsetInMilliseconds'] = 0;
                  _this.attributes['loop'] = false;
                  _this.attributes['shuffle'] = false;
                  _this.attributes['playbackIndexChanged'] = true;
                  //  Change state to START_MODE
                  _this.handler.state = constants.states.START_MODE;
              }
              controller.play.call(_this);
              });
        },
        'AMAZON.HelpIntent' : function () {
            var message = 'Welcome to Boswell Memories. You can say, playback, to begin listening to recorded interviews.';
            this.response.speak(message).listen(message);
            this.emit(':responseReady');
        },
        'AMAZON.StopIntent' : function () {
            var message = 'Good bye.';
            this.response.speak(message);
            this.emit(':responseReady');
        },
        'AMAZON.CancelIntent' : function () {
            var message = 'Good bye.';
            this.response.speak(message);
            this.emit(':responseReady');
        },
        'SessionEndedRequest' : function () {
            // No session ended logic
        },
        'Unhandled' : function () {
            var message = 'Sorry, I could not understand. Please say, playback the interview, to begin the playback.';
            this.response.speak(message).listen(message);
            this.emit(':responseReady');
        }
    }),
    playModeIntentHandlers : Alexa.CreateStateHandler(constants.states.PLAY_MODE, {
        /*
         *  All Intent Handlers for state : PLAY_MODE
         */
        'LaunchRequest' : function () {
          let _this = this;
            audioData(function(err, list) {  // Added per Mike Reinstein
              // Initialize Attributes
                _this.attributes['playOrder'] = Array.apply(null, {length: list.length}).map(Number.call, Number);
            /*
             *  Session resumed in PLAY_MODE STATE.
             *  If playback had finished during last session :
             *      Give welcome message.
             *      Change state to START_STATE to restrict user inputs.
             *  Else :
             *      Ask user if he/she wants to resume from last position.
             *      Change state to RESUME_DECISION_MODE
             */
            var message;
            var reprompt;
            if (_this.attributes['playbackFinished']) {
                _this.handler.state = constants.states.START_MODE;
                message = 'Welcome to Boswell Memories. You can say, playback, to begin listening to recorded interviews.';
                reprompt = 'You can say, playback the interview, to begin.';
            } else {
                _this.handler.state = constants.states.RESUME_DECISION_MODE;
                console.log('list[]=',list);
               console.log("_this.attributes['playOrder']=",_this.attributes['playOrder']);
               console.log("_this.attributes['index']=",_this.attributes['index']);
//               console.log("full list request: ",list[_this.attributes['playOrder'][_this.attributes['index']]].title);
                message = 'You were listening to ' + list[_this.attributes['playOrder'][_this.attributes['index']]].title +
                    ' Would you like to resume?';
                reprompt = 'You can say yes to resume or no to play from the top.';
            }

            _this.response.speak(message).listen(reprompt);
            _this.emit(':responseReady');
          });
        },
        'PlayAudio': function () {
          let _this = this;
            audioData(function(err, list) {  // Added per Mike Reinstein
              // console.log("--- Inside PlayAudio function line 115 ---",_this.attributes['index']);
              // console.log('list[]=',list);
              // console.log("_this.attributes['playOrder']=",_this.attributes['playOrder']);
              // console.log("_this.attributes['index']=",_this.attributes['index']);
              // console.log("list[_this.attributes['playOrder'][_this.attributes['index']]].title=",list[_this.attributes['playOrder'][_this.attributes['index']]].title);
              var message = 'You are now listening to ' + list[_this.attributes['playOrder'][_this.attributes['index']]].title + ' Ready?';
              var reprompt = 'You can say yes to resume or no to play from the top.';
              controller.play.call(_this)
          });
        },
        'AMAZON.NextIntent' : function () { controller.playNext.call(this) },
        'AMAZON.PreviousIntent' : function () { controller.playPrevious.call(this) },
        'AMAZON.PauseIntent' : function () { controller.stop.call(this) },
        'AMAZON.StopIntent' : function () { controller.stop.call(this) },
        'AMAZON.CancelIntent' : function () { controller.stop.call(this) },
        'AMAZON.ResumeIntent' : function () { controller.play.call(this) },
        'AMAZON.LoopOnIntent' : function () { controller.loopOn.call(this) },
        'AMAZON.LoopOffIntent' : function () { controller.loopOff.call(this) },
        'AMAZON.ShuffleOnIntent' : function () { controller.shuffleOn.call(this) },
        'AMAZON.ShuffleOffIntent' : function () { controller.shuffleOff.call(this) },
        'AMAZON.StartOverIntent' : function () { controller.startOver.call(this) },
        'AMAZON.HelpIntent' : function () {
            // This will called while audio is playing and a user says "ask <invocation_name> for help"
            var message = 'You are listening to Boswell. You can say, Next or Previous to navigate through the list of interviews. ' +
                'At any time, you can say Pause to pause the audio and Resume to resume.';
            this.response.speak(message).listen(message);
            this.emit(':responseReady');
        },
        'SessionEndedRequest' : function () {
            // No session ended logic
        },
        'Unhandled' : function () {
            var message = 'Sorry, I could not understand. You can say, Next or Previous to navigate through the list of interviews.';
            this.response.speak(message).listen(message);
            this.emit(':responseReady');
        }
    }),
    remoteControllerHandlers : Alexa.CreateStateHandler(constants.states.PLAY_MODE, {
        /*
         *  All Requests are received using a Remote Control. Calling corresponding handlers for each of them.
         */
        'PlayCommandIssued' : function () { controller.play.call(this) },
        'PauseCommandIssued' : function () { controller.stop.call(this) },
        'NextCommandIssued' : function () { controller.playNext.call(this) },
        'PreviousCommandIssued' : function () { controller.playPrevious.call(this) }
    }),
    resumeDecisionModeIntentHandlers : Alexa.CreateStateHandler(constants.states.RESUME_DECISION_MODE, {
        /*
         *  All Intent Handlers for state : RESUME_DECISION_MODE
         */
        'LaunchRequest' : function () {
          let _this = this;
            audioData(function(err, list) {  // Added per Mike Reinstein
            var message = 'You were listening to ' + list[_this.attributes['playOrder'][_this.attributes['index']]].title +
                ' Would you like to resume?';
            var reprompt = 'You can say yes to resume or no to play from the top.';
            _this.response.speak(message).listen(reprompt);
            _this.emit(':responseReady');
          });
        },
        'AMAZON.YesIntent' : function () { controller.play.call(this) },
        'AMAZON.NoIntent' : function () { controller.reset.call(this) },
        'AMAZON.HelpIntent' : function () {
          let _this = this;
            audioData(function(err, list) {  // Added per Mike Reinstein
            var message = 'You were listening to ' + list[_this.attributes['index']].title +
                ' Would you like to resume?';
            var reprompt = 'You can say yes to resume or no to play from the top.';
            _this.response.speak(message).listen(reprompt);
            _this.emit(':responseReady');
          });
        },
        'AMAZON.StopIntent' : function () {
            var message = 'Good bye.';
            this.response.speak(message);
            this.emit(':responseReady');
        },
        'AMAZON.CancelIntent' : function () {
            var message = 'Good bye.';
            this.response.speak(message);
            this.emit(':responseReady');
        },
        'SessionEndedRequest' : function () {
            // No session ended logic
        },
        'Unhandled' : function () {
            var message = 'Sorry, this is not a valid command. Please say help to hear what you can say.';
            this.response.speak(message).listen(message);
            this.emit(':responseReady');
        }
    })
};

module.exports = stateHandlers;

var controller = function () {
    return {
        play: function () {
          let _this = this;
          audioData(function(err, list) {  // Added per Mike Reinstein -- DOES IT WORK IN THIS CONTEXT?
            // Initialize Attributes
            /*
             *  Using the function to begin playing audio when:
             *      Play Audio intent invoked.
             *      Resuming audio when stopped/paused.
             *      Next/Previous commands issued.
             */
            _this.handler.state = constants.states.PLAY_MODE;

            // if (_this.attributes['playbackFinished']) {
            //     // Reset to top of the playlist when reached end.
            //     _this.attributes['index'] = 0;
            //     _this.attributes['offsetInMilliseconds'] = 0;
            //     _this.attributes['playbackIndexChanged'] = true;
            //     _this.attributes['playbackFinished'] = false;
            // }
            // temporary: reset to first item on playlist every time
              _this.attributes['index'] = 0;
              _this.attributes['offsetInMilliseconds'] = 0;
              _this.attributes['playbackIndexChanged'] = true;
              _this.attributes['playbackFinished'] = false;

            var token = String(_this.attributes['playOrder'][_this.attributes['index']]);
            var playBehavior = 'REPLACE_ALL';

              var podcast = list[_this.attributes['playOrder'][_this.attributes['index']]];
              var offsetInMilliseconds = _this.attributes['offsetInMilliseconds'];
              // Since play behavior is REPLACE_ALL, enqueuedToken attribute need to be set to null.
              _this.attributes['enqueuedToken'] = null;

              if (canThrowCard.call(_this)) {
                  var cardTitle = podcast.title;
                  var cardContent = 'Watson transcription: ' + podcast.transcription;
                  _this.response.cardRenderer(cardTitle, cardContent, null);
              }
              console.log("podcast.url = ", podcast.url);
              _this.response.audioPlayerPlay(playBehavior, podcast.url, token, null, offsetInMilliseconds);
              _this.emit(':responseReady');
            });
        },
        stop: function () {
            /*
             *  Issuing AudioPlayer.Stop directive to stop the audio.
             *  Attributes already stored when AudioPlayer.Stopped request received.
             */
            this.response.audioPlayerStop();
            this.emit(':responseReady');
        },
        playNext: function () {
          let _this = this;
            audioData(function(err, list) {  // Added per Mike Reinstein
            /*
             *  Called when AMAZON.NextIntent or PlaybackController.NextCommandIssued is invoked.
             *  Index is computed using token stored when AudioPlayer.PlaybackStopped command is received.
             *  If reached the end of the playlist, choose behavior based on "loop" flag.
             */
            var index = _this.attributes['index'];
            index += 1;
            // Check for last audio file.
            if (index === list.length) {
                if (_this.attributes['loop']) {
                    index = 0;
                } else {
                    // Reached the end. Thus reset state to start mode and stop playing.
                    _this.handler.state = constants.states.START_MODE;

                    var message = 'You have reached the end of the playlist.';
                    _this.response.speak(message).audioPlayerStop();
                    return _this.emit(':responseReady');
                }
            }
            // Set values to attributes.
            _this.attributes['index'] = index;
            _this.attributes['offsetInMilliseconds'] = 0;
            _this.attributes['playbackIndexChanged'] = true;
            controller.play.call(_this);
          });
        },
        playPrevious: function () {
          let _this = this;
            audioData(function(err, list) {  // Added per Mike Reinstein
            /*
             *  Called when AMAZON.PreviousIntent or PlaybackController.PreviousCommandIssued is invoked.
             *  Index is computed using token stored when AudioPlayer.PlaybackStopped command is received.
             *  If reached at the end of the playlist, choose behavior based on "loop" flag.
             */
            var index = _this.attributes['index'];
            index -= 1;
            // Check for last audio file.
            if (index === -1) {
                if (_this.attributes['loop']) {
                    index = list.length - 1;
                } else {
                    // Reached at the end. Thus reset state to start mode and stop playing.
                    _this.handler.state = constants.states.START_MODE;

                    var message = 'You have reached the start of the playlist.';
                    _this.response.speak(message).audioPlayerStop();
                    return _this.emit(':responseReady');
                }
            }
            // Set values to attributes.
            _this.attributes['index'] = index;
            _this.attributes['offsetInMilliseconds'] = 0;
            _this.attributes['playbackIndexChanged'] = true;

            controller.play.call(_this);
          });
        },
        loopOn: function () {
            // Turn on loop play.
            this.attributes['loop'] = true;
            var message = 'Loop turned on.';
            this.response.speak(message);
            this.emit(':responseReady');
        },
        loopOff: function () {
            // Turn off looping
            this.attributes['loop'] = false;
            var message = 'Loop turned off.';
            this.response.speak(message);
            this.emit(':responseReady');
        },
        shuffleOn: function () {
            // Turn on shuffle play.
            this.attributes['shuffle'] = true;
            shuffleOrder((newOrder) => {
                // Play order have been shuffled. Re-initializing indices and playing first song in shuffled order.
                this.attributes['playOrder'] = newOrder;
                this.attributes['index'] = 0;
                this.attributes['offsetInMilliseconds'] = 0;
                this.attributes['playbackIndexChanged'] = true;
                controller.play.call(this);
            });
        },
        shuffleOff: function () {
          let _this = this;
            audioData(function(err, list) {  // Added per Mike Reinstein
            // Turn off shuffle play.
            if (_this.attributes['shuffle']) {
                _this.attributes['shuffle'] = false;
                // Although changing index, no change in audio file being played as the change is to account for reordering playOrder
                _this.attributes['index'] = _this.attributes['playOrder'][_this.attributes['index']];
                _this.attributes['playOrder'] = Array.apply(null, {length: list.length}).map(Number.call, Number);
            }
            controller.play.call(_this);
          });
        },
        startOver: function () {
            // Start over the current audio file.
            this.attributes['offsetInMilliseconds'] = 0;
            controller.play.call(this);
        },
        reset: function () {
            // Reset to top of the playlist.
            this.attributes['index'] = 0;
            this.attributes['offsetInMilliseconds'] = 0;
            this.attributes['playbackIndexChanged'] = true;
            controller.play.call(this);
        }
    }
}();

function canThrowCard() {
    /*
     * To determine when can a card should be inserted in the response.
     * In response to a PlaybackController Request (remote control events) we cannot issue a card,
     * Thus adding restriction of request type being "IntentRequest".
     */
    if (this.event.request.type === 'IntentRequest' && this.attributes['playbackIndexChanged']) {
        this.attributes['playbackIndexChanged'] = false;
        return true;
    } else {
        return false;
    }
}

function shuffleOrder(callback) {
    audioData(function(err, list) {  // Added per Mike Reinstein
    // Algorithm : Fisher-Yates shuffle
    var array = Array.apply(null, {length: list.length}).map(Number.call, Number);
    var currentIndex = array.length;
    var temp, randomIndex;

    while (currentIndex >= 1) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }
    callback(array);
  });
}
