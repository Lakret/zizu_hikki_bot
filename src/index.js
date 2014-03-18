var _ = require('lodash');
var oauth = require('oauth');
var args = require('yargs').argv;
var request = require('request');
var rl = require('readline').createInterface(process.stdin, process.stdout);
var printer = require('pretty-print');
var ppOptions = {'leftPadding': 2, 'rightPadding': 2};
var print = function(obj) { printer(obj, ppOptions) };
var twitter = require('ntwitter');
var fs = require('fs');
var path = require('path');
var async = require('async');
var bm = require('./behaviorModel.js');

if (_.contains(args._, 'makeToken')) {
  console.log('making token...');
  var key = args.key;
  var secret = args.secret;
  console.log('%s, %s', key, secret);

  var oauth = new oauth.OAuth('https://api.twitter.com/oauth/request_token', 'https://api.twitter.com/oauth/access_token', key, secret, '1.0A', null, 'HMAC-SHA1');
  
  oauth.getOAuthRequestToken(function(error, token, token_secret, parsedQueryString){
    if (error) {
       print(error);
    } else {
      console.log('token: %s\ntoken_secret: %s\nredirect_url:\nhttps://api.twitter.com/oauth/authenticate?oauth_token=%s\n', token, token_secret, token);

      rl.question('Now go to redirect url and type here a PIN: ', function(pin) {
        oauth.getOAuthAccessToken(token, token_secret, pin, function(err, access_token, access_token_secret, result){
          if (error) {
            print(error);
          } else {
            console.log('access_token:\n%s\naccess_token_secret:\n%s\nresult:\n', access_token, access_token_secret);
            print(result);
          }
        }); 
        rl.close();
      });
    }
  });
} else {
  fs.readFile(path.join(path.dirname(fs.realpathSync(__filename)), '../account.key'), function(error, content) {
    var keys = content.toString().split(',');
    // print(keys);
    var twit = new twitter({
      consumer_key: keys[0],
      consumer_secret: keys[1],
      access_token_key: keys[2],
      access_token_secret: keys[3]
    });

    if (!_.contains(args._, 'skipFirst')) {
      bm.emulate(twit);
    } else {
      console.log('skipping first...')
    };

    var delay = 17 * 60000;
    setInterval(function(){ bm.emulate(twit); }, delay);
  });
}

