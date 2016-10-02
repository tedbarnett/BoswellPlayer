Regarding the problem you're having, you'll need to slightly refactor your code.

audioAssets.js exposed a static list. Instead, you want to pull a list of stories dynamically at run time.

Your refactored boswellStories.js would look like this:

module.exports = function getBoswellStories(callback) {
  var stories = [];
  docClient.get(params, function (err, data) {
    // stories.push({})  // do this for each story in the data response
    callback(err, stories);
  }
};

DONE

--------

Now wherever you pull in getBoswellStories would change to reflect that this is now an asynchronous operation. For example, in stateHandlers.js, your 'LaunchRequest' handler looks like this:

'LaunchRequest' : function() {
  this.attributes['playOrder'] = Array.apply(null, {length: audioData.length}).map(Number.call, Number);

  // .. do a bunch of other stuff

  this.response.speak(message).listen(reprompt);
  this.emit(':responseReady');
},

Modify the LaunchRequest like this, to reflect that this is asynchronous:

'LaunchRequest' : function() {
  audioData(function(err, list) {  // THIS IS THE ONLY CHANGE?
    this.attributes['playOrder'] = Array.apply(null, {length: list.length}).map(Number.call, Number);

    // .. do a bunch of other stuff

    this.response.speak(message).listen(reprompt);
    this.emit(':responseReady');
  });
},

DONE, but I never called "getBoswellStories", I called boswellStories.  