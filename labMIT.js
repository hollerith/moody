#!/usr/bin/env node

var labMIT = require('./labMIT.json');

labMIT.forEach(function(item) {
  console.log( '"%s": %s,', item.word, ((Math.round(item.happiness_average))-5));
});

