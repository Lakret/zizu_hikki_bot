var TweetComposer = require('./tweetComposer.js');
var printer = require('pretty-print');
var ppOptions = {'leftPadding': 2, 'rightPadding': 2};
var print = function(obj) { printer(obj, ppOptions) };

var twitProbability = 0.5;

var emulate = function(twit) {
  if (twit) {
    if (Math.random() < twitProbability) {
      twit.updateStatus(TweetComposer.compose(), function(error, data) {
        if (error) { print(error) } else { console.log("posted") };
      })
    } else {
      console.log("won't tweet");
    }
  } else {
    console.log("error: no tweet");
  }
}

exports.emulate = emulate;
