var util = require('util');
var _ = require('lodash');
var S = require('string');

var actions = [ 'writing', 'doing', 'unleashing', 'testing', 'debugging', 'compiling', 'building', 'thinking about', 'googling some stuff about' ];
var languages = {
  'positive': [ 'Erlang', 'C++', 'Perl', 'Python' ],
  'negative': [ 'JavaScript', 'C#', 'Scala' ]
};
var adjectives = {
  'positive': [ 'fancy', 'beautiful', 'concise', 'elegant', 'kawai' ],
  'negative': [ 'much hated', 'ugly', 'shameful', 'useless', 'fucked up', 'bloated' ]
};
var simultaneousActions = [ 'reading #hentai manga', 'watching #hentai', 'buying #hentai', 'checking out new #anime', 'smoking' ];
var simultaneousConnections = [ 'while simultaneously', 'and', 'in parallel with' ];
var simultaneousActionsProbability = 0.73;
var adjectivesUsageProbability = 0.3;

var takeRandom = function(coll, attitude, probability) {
  if (!probability || (Math.random() < probability)) {
    if (_.isArray(coll)) {
      return _.shuffle(coll)[0];
    } else {
      return _.shuffle(coll[attitude])[0];
    }
  } else {
    return '';
  }
};

// todo: group colls with probs
var makeArr = function() {
  var attitude = takeRandom(['positive', 'negative']);
  var simultaneousAction = takeRandom(simultaneousActions, undefined, simultaneousActionsProbability);
  var basic = [
    S(takeRandom(actions)).capitalize().toString(),
    takeRandom(adjectives, attitude, adjectivesUsageProbability),
    takeRandom(languages, attitude)
  ];
  if (simultaneousAction != '') {
    return basic.concat([
      takeRandom(simultaneousConnections),
      simultaneousAction
    ]);
  } else {
    return basic;
  }
};

var compose = function() { 
  return _.filter(makeArr(), function(x) {return x != '';}).join(' ') + '.';
};

exports.compose = compose;
